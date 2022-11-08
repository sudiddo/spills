import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { Bill } from "store/app/types";

interface Props {
  bill: Bill | null;
  onBack: (bill: Bill) => void;
}

function AddBillForm({ onBack, bill }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: bill?.id || uuidv4(),
      name: bill?.name || "",
      orders: bill?.orders || [
        { id: uuidv4(), orderName: "", amount: "1", price: "" },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "orders", // unique name for your Field Array
  });

  const onSubmit = (data: Bill) => {
    onBack(data);
  };

  return (
    <div className="">
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
      >
        {/* register your input into the hook by invoking the "register" function */}

        <div className="my-5 flex flex-col">
          <input
            className="p-2 rounded-md border border-orange-400"
            placeholder="Name... (e.g. Tatang)"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-500 text-xs mt-1">
              This field is required
            </span>
          )}
        </div>

        <div className="flex flex-col">
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col w-full mb-5">
              <div className="flex flex-row justify-between items-center my-3">
                <p className="text-lg">Order {index + 1}</p>
                {fields.length > 1 && (
                  <button
                    onClick={() => fields.length > 1 && remove(index)}
                    className="py-1 px-2 bg-red-400 text-xs text-white rounded-md flex justify-center items-center"
                  >
                    <AiOutlineClose className="mr-1" /> Remove
                  </button>
                )}
              </div>
              {/* FORM */}
              <div className="flex flex-row mb-3">
                <input
                  placeholder="Nasi Goreng... (optional)"
                  className="border border-orange-400 rounded-md p-2 flex-1"
                  {...register(`orders.${index}.orderName`)}
                />
                <input
                  placeholder="1"
                  className="border border-orange-400 rounded-md p-2 ml-3 w-12 text-center"
                  {...register(`orders.${index}.amount`)}
                />
              </div>
              <div className="flex flex-col">
                <input
                  placeholder="Price... (e.g. 10000)"
                  className="border border-orange-400 rounded-md p-2 flex-1"
                  {...register(`orders.${index}.price`, { required: true })}
                />
                {errors.orders?.[index] && (
                  <span className="text-red-500 text-xs mt-1">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          ))}
          <div className="flex flex-row justify-end">
            <button
              onClick={() =>
                append({
                  id: uuidv4(),
                  orderName: "",
                  amount: "1",
                  price: "",
                })
              }
              className="ml-3 h-10 p-3 border border-green-400 rounded-md flex justify-center items-center"
            >
              <AiOutlinePlus className="mr-2" color="green" /> Add Order
            </button>
          </div>
        </div>

        <button
          className="mt-5 py-2 rounded-md bg-[#755E4B] text-white"
          type="submit"
        >
          Done
        </button>
      </form>
    </div>
  );
}

export default AddBillForm;
