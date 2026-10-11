import { useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2, X } from "lucide-react";
import Button from "../common/Button";
import Tag from "../common/Tag";
import { Field, FieldError, Options } from "../common/Field";
import { DIFFICULTIES } from "../../data/constants";
import { makeFeature } from "../../utils/questionHelpers";

const MAX_TAGS = 4;
const MAX_TAG_LENGTH = 24;

const featureSchema = z.object({ id: z.string(), title: z.string(), difficulty: z.enum(DIFFICULTIES) }).passthrough();

const roundSchema = z.object({
  title: z.string().trim().min(1, "Enter a title for the coding round.").max(80, "Title can be 80 characters at most."),
  subtitle: z.string().trim().max(160, "Keep the description under 160 characters."),
  tags: z.array(z.string()),
  features: z.array(featureSchema).superRefine((list, ctx) => {
    const titles = list.map((f) => f.title.trim()).filter(Boolean);
    const duplicate = titles.find((t, i) => titles.findIndex((x) => x.toLowerCase() === t.toLowerCase()) !== i);
    let message;
    if (titles.length === 0) message = "Add at least one feature to track.";
    else if (titles.some((t) => t.length > 120)) message = "Keep each feature under 120 characters.";
    else if (duplicate) message = `"${duplicate}" appears more than once.`;
    if (message) ctx.addIssue({ code: "custom", message });
  }),
});

const sameTag = (a, b) => a.toLowerCase() === b.toLowerCase();

// Features keep their ids, so statuses survive edits
export default function CodingRoundForm({ initial, onSave, onCancel, onDelete }) {
  const defaultValues = useMemo(
    () => ({
      title: initial?.title ?? "",
      subtitle: initial?.subtitle ?? "",
      tags: initial?.tags ?? [],
      features: initial?.features?.length ? initial.features.map((f) => ({ ...f })) : [makeFeature()],
    }),
    [initial]
  );
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: zodResolver(roundSchema), defaultValues });
  const { fields, append, remove } = useFieldArray({ control, name: "features", keyName: "_key" });
  const [tagText, setTagText] = useState("");

  const tags = watch("tags");
  const tagsFull = tags.length >= MAX_TAGS;
  const featuresError = errors.features?.root?.message ?? errors.features?.message;

  const setTags = (next) => setValue("tags", next, { shouldDirty: true });

  const addTag = () => {
    const text = tagText.trim();
    if (!text) return;
    if (tagsFull) return setError("tags", { message: `You can add up to ${MAX_TAGS} tags.` });
    if (text.length > MAX_TAG_LENGTH) return setError("tags", { message: `Keep each tag under ${MAX_TAG_LENGTH} characters.` });
    if (tags.some((t) => sameTag(t, text))) return setError("tags", { message: "This tag is already added." });
    setTags([...tags, text]);
    setTagText("");
    clearErrors("tags");
  };

  // Pending tag still counts
  const resolvePendingTag = () => {
    const text = tagText.trim();
    if (!text || tags.some((t) => sameTag(t, text))) return { tags };
    if (tagsFull) return { tags, error: `You can add up to ${MAX_TAGS} tags. Remove one or clear the tag field.` };
    if (text.length > MAX_TAG_LENGTH) return { tags, error: `Keep each tag under ${MAX_TAG_LENGTH} characters.` };
    return { tags: [...tags, text] };
  };

  const submit = handleSubmit(
    (values) => {
      const pending = resolvePendingTag();
      if (pending.error) return setError("tags", { message: pending.error });
      const features = values.features.map((f) => ({ ...f, title: f.title.trim() })).filter((f) => f.title);
      onSave({ title: values.title, subtitle: values.subtitle, tags: pending.tags, features });
    },
    () => {
      const { error } = resolvePendingTag();
      if (error) setError("tags", { message: error });
    }
  );

  const addFeature = () => {
    clearErrors("features");
    append(makeFeature());
  };

  const removeFeature = (index) => {
    clearErrors("features");
    remove(index);
  };

  return (
    <form className="grid gap-4" onSubmit={submit} noValidate>
      <Field label="Title">
        <input type="text" data-autofocus placeholder="e.g. Interview Practice Tracker" aria-invalid={Boolean(errors.title)} {...register("title")} />
        <FieldError>{errors.title?.message}</FieldError>
      </Field>

      <Field label="Subtitle / description">
        <input
          type="text"
          placeholder="e.g. Build a responsive dashboard to manage weekly interview preparation."
          aria-invalid={Boolean(errors.subtitle)}
          {...register("subtitle")}
        />
        <FieldError>{errors.subtitle?.message}</FieldError>
      </Field>

      <div className="grid min-w-0 gap-1.5" role="group" aria-labelledby="tags-label">
        <span id="tags-label" className="text-[0.78rem] font-medium text-muted">
          Tags ({tags.length}/{MAX_TAGS})
        </span>
        {tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <li key={t}>
                <Tag tone="cat" className="inline-flex items-center gap-1 pr-1">
                  {t}
                  <button
                    type="button"
                    className="grid place-items-center rounded-full p-[3px] hover:bg-cat/22"
                    onClick={() => setTags(tags.filter((x) => x !== t))}
                    aria-label={`Remove tag ${t}`}
                  >
                    <X size={12} />
                  </button>
                </Tag>
              </li>
            ))}
          </ul>
        )}
        <div className="flex gap-2">
          <input
            className="min-w-0 flex-1"
            type="text"
            value={tagText}
            onChange={(e) => {
              setTagText(e.target.value);
              clearErrors("tags");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder={tagsFull ? "Tag limit reached" : "e.g. React"}
            aria-label="New tag"
            disabled={tagsFull}
          />
          <Button className="shrink-0" onClick={addTag} disabled={tagsFull}>
            Add tag
          </Button>
        </div>
        <FieldError>{errors.tags?.message}</FieldError>
      </div>

      <div className="grid min-w-0 gap-1.5" role="group" aria-labelledby="features-label">
        <span id="features-label" className="text-[0.78rem] font-medium text-muted">
          Feature checklist
        </span>
        <ul className="grid gap-2">
          {fields.map((field, i) => (
            <li key={field._key} className="flex items-center gap-2">
              <input
                className="min-w-0 flex-1"
                type="text"
                placeholder="e.g. Responsive dashboard layout"
                aria-label={`Feature ${i + 1}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addFeature();
                  }
                }}
                {...register(`features.${i}.title`, { onChange: () => clearErrors("features") })}
              />
              <select className="w-[108px] flex-none" aria-label={`Difficulty for feature ${i + 1}`} {...register(`features.${i}.difficulty`)}>
                <Options values={DIFFICULTIES} />
              </select>
              <Button variant="icon" onClick={() => removeFeature(i)} aria-label={`Remove feature ${i + 1}`}>
                <Trash2 size={16} />
              </Button>
            </li>
          ))}
        </ul>
        <div>
          <Button onClick={addFeature}>
            <Plus size={16} /> Add Feature
          </Button>
        </div>
        <FieldError>{featuresError}</FieldError>
      </div>

      <div className="sticky -bottom-[18px] -mx-[18px] -mb-[18px] flex flex-wrap justify-end gap-2.5 border-t bg-surface px-[18px] py-3 sm:-bottom-[22px] sm:-mx-[22px] sm:-mb-[22px] sm:px-[22px] sm:py-3.5">
        {initial && onDelete && (
          <Button variant="danger" className="mr-auto" onClick={onDelete}>
            Delete round
          </Button>
        )}
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">
          {initial ? "Save changes" : "Save coding round"}
        </Button>
      </div>
    </form>
  );
}
