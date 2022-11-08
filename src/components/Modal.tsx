import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBill, appSelector } from "store/app/reducer";
import { IoIosArrowBack } from "react-icons/io";

import AddBillForm from "./AddBillForm";
import { Bill } from "store/app/types";
import { AiOutlineClose } from "react-icons/ai";
import numeral from "numeral";
import { v4 as uuidv4 } from "uuid";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function Modal({ isOpen, setIsOpen }: Props) {
  const { grandTotal, bills } = useSelector(appSelector);
  const dispatch = useDispatch();
  const [tempBills, setTempBills] = useState([] as Bill[]);
  const [selectedBill, setSelectedBill] = useState({} as Bill);
  const [total, setTotal] = useState<number | null>(grandTotal);
  const [error, setError] = useState({
    grandTotal: false,
    order: false,
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAdding(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (grandTotal === 0 && bills.length === 0) {
      setTempBills([]);
      setTotal(null);
      setSelectedBill({} as Bill);
    }
  }, [grandTotal, bills]);

  const validation = () => {
    // check if total is not null and more than 0 also check if bills is more than 0
    if (total === null || total < 0 || tempBills.length < 1) {
      setError({
        grandTotal: total === null || total < 0,
        order: tempBills.length < 1,
      });
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (validation()) {
      dispatch(
        addBill({
          grandTotal: total!,
          bills: tempBills,
        })
      );
      setIsOpen(false);
    }
  };

  const renderBody = () =>
    !isAdding ? (
      <div>
        <div className="flex flex-col my-5">
          <input
            value={total ? String(total) : ""}
            onChange={(e) => {
              setTotal(Number(e.target.value));
            }}
            className="p-2 rounded-md border border-orange-400 w-full"
            placeholder="Grand Total... (e.g. 100000)"
          />
          {error.grandTotal && (
            <span className="text-red-500 text-xs mt-1">
              This field is required
            </span>
          )}
        </div>
        {tempBills.length > 0 ? (
          tempBills.map((bill) => {
            const subtotal = bill.orders.reduce(
              (acc, item) =>
                acc +
                item.price *
                  (item.amount ? (Number(item.amount) < 1 ? 1 : 1) : 1),
              0
            );
            return (
              <div
                key={bill.id}
                className="flex flex-row items-center justify-center mb-3"
              >
                <div
                  onClick={() => {
                    setSelectedBill(bill);
                    setIsAdding(true);
                  }}
                  key={bill.id}
                  className="w-full border rounded-md p-2 flex flex-row justify-between"
                >
                  <p>
                    {bill.name}
                    <span className="ml-2 text-xs">
                      ({bill.orders.length} Order{bill.orders.length > 1 && "s"}
                      )
                    </span>
                  </p>
                  <p>Rp {numeral(subtotal).format("0,0")}</p>
                </div>
                <button
                  onClick={() => {
                    setTempBills(
                      tempBills.filter((item) => item.id !== bill.id)
                    );
                  }}
                  className="border-red-500 border rounded-md p-2 ml-4 flex items-center justify-center"
                >
                  <AiOutlineClose color="red" />
                </button>
              </div>
            );
          })
        ) : (
          <div className="p-5">
            {error.order ? (
              <p className="text-center text-lg text-red-400">
                Order cannot be empty
              </p>
            ) : (
              <p className="text-center text-lg text-gray-400">Order Empty</p>
            )}
          </div>
        )}
      </div>
    ) : (
      <AddBillForm
        bill={selectedBill}
        onBack={(data) => {
          const index = tempBills.findIndex((bill) => bill.id === data.id);
          if (index !== -1) {
            const newBills = [...tempBills];
            newBills[index] = data;
            setTempBills(newBills);
          } else {
            setTempBills([...tempBills, data]);
          }

          setIsAdding(false);
          setSelectedBill({} as Bill);
        }}
      />
    );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex flex-row items-center"
                >
                  <div className="flex flex-row justify-between w-full items-center">
                    <div className="flex flex-row flex-1 items-center">
                      {isAdding ? (
                        <button
                          onClick={() => setIsAdding(false)}
                          className="inline-flex justify-center rounded-md border border-transparent bg-orange-100 p-2 text-sm font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 mr-3"
                        >
                          <IoIosArrowBack />
                        </button>
                      ) : null}
                      <p>{isAdding ? "Add Bill" : "Bills"}</p>
                    </div>
                    {!isAdding ? (
                      <button
                        onClick={() => setIsAdding(true)}
                        type="button"
                        className="w-28 inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-1 text-sm font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                      >
                        New Order
                      </button>
                    ) : null}
                  </div>
                </Dialog.Title>
                {renderBody()}

                <div className="mt-5 flex justify-end w-full">
                  {!isAdding ? (
                    <button
                      onClick={onSubmit}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    >
                      That's it
                    </button>
                  ) : null}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
