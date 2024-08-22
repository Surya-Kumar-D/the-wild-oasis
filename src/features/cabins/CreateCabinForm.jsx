import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";

import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  console.log(errors);
  const { isCreating, createCabin } = useCreateCabin();

  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;
  function onSubmit(data) {
    console.log("Submitted Data:", data);
    console.log("Submitted Data:", data);

    if (!data.image || data.image.length === 0) {
      toast.error("Please upload an image");
      return;
    }

    // Check if data.image is a FileList and has at least one file
    const imageFile = data.image[0]; // Access the first file in the FileList
    if (!imageFile) {
      toast.error("No file found in image input");
      return;
    }

    // mutate({ ...data, image: imageFile });
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data, editId) => {
            reset(editId);
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
            onCloseModal?.();
          },
        }
      );
    console.log(data);

    console.log("Form Data:", data);
    console.log("Image Data:", data.image);
  }
  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="discount" error={errors?.name?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description for website" error={errors?.name?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.name?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          type="file"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isEditSession ? `Edit cabin` : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
