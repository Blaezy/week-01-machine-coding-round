import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";
import Button from "../common/Button";
import { Field, FieldError, Options } from "../common/Field";
import { CATEGORIES, DIFFICULTIES, STATUSES } from "../../data/constants";

const buildSchema = (existing) =>
  z
    .object({
      title: z
        .string()
        .trim()
        .min(1, "Enter a question title.")
        .min(3, "Title needs at least 3 characters.")
        .max(100, "Title can be 100 characters at most."),
      category: z.enum(CATEGORIES),
      difficulty: z.enum(DIFFICULTIES),
      status: z.enum(STATUSES),
    })
    .superRefine(({ title, category }, ctx) => {
      const duplicate = existing.some((q) => q.category === category && q.title.toLowerCase() === title.toLowerCase());
      if (duplicate) ctx.addIssue({ code: "custom", path: ["title"], message: `This question is already in ${category}.` });
    });

export default function QuestionForm({ onAdd, onCancel, existing, defaultCategory = "DSA" }) {
  const schema = useMemo(() => buildSchema(existing), [existing]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { title: "", category: defaultCategory, difficulty: "Easy", status: "Pending" },
  });
  const error = errors.title?.message;

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onAdd)} noValidate>
      <Field label="Question">
        <input
          type="text"
          placeholder="e.g. Two Sum (LC 1)"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "form-error" : undefined}
          {...register("title")}
        />
      </Field>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        <Field label="Category">
          <select {...register("category")}>
            <Options values={CATEGORIES} />
          </select>
        </Field>
        <Field label="Difficulty">
          <select {...register("difficulty")}>
            <Options values={DIFFICULTIES} />
          </select>
        </Field>
        <Field label="Status">
          <select {...register("status")}>
            <Options values={STATUSES} />
          </select>
        </Field>
      </div>

      <FieldError id="form-error">{error}</FieldError>

      <div className="flex flex-wrap justify-end gap-2.5">
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">
          <Plus size={16} /> Add question
        </Button>
      </div>
    </form>
  );
}
