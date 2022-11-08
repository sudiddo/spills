import ItemCard from "components/ItemCard";
import Layout from "components/Layout";
import Coins from "assets/coins.png";
import { CardItem } from "types/item";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Modal from "components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addBill, appSelector } from "store/app/reducer";
import numeral from "numeral";

export default function Home() {
  const dispatch = useDispatch();
  const { bills, grandTotal } = useSelector(appSelector);
  const [isOpen, setIsOpen] = useState(false);

  // count total bills orders
  const subTotal = bills.reduce((acc, bill) => {
    const total = bill.orders.reduce((acc, order) => {
      return acc + (order.amount || 1) * order.price;
    }, 0);
    return acc + total;
  }, 0);

  return (
    <Layout>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-full px-6 flex flex-col">
        <div className="flex flex-row">
          {bills.length > 0 && (
            <button
              onClick={() => {
                dispatch(addBill({ grandTotal: 0, bills: [] }));
                setIsOpen(true);
              }}
              className="flex-1 mr-3 bg-blue-300 py-3 px-6 rounded-xl font-semibold place-content-end"
            >
              New Bill
            </button>
          )}
          <button
            onClick={() => setIsOpen(true)}
            className="flex-1 bg-green-300 py-3 px-6 rounded-xl font-semibold place-content-end"
          >
            {bills.length > 0 ? "Edit" : "Add"} Bill
          </button>
        </div>

        {bills.length > 0 ? (
          <>
            <div className="flex flex-col mt-5">
              <div className="flex flex-row justify-between">
                <p>Total Without Additional Fee</p>
                <p>Rp. {numeral(subTotal).format("0,0")}</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>Grand Total</p>
                <p>Rp. {numeral(grandTotal).format("0,0")}</p>
              </div>
            </div>
            <div className="flex flex-row border-b-[1px] font-semibold text-lg border-black py-3 mb-2">
              <p className="flex flex-1">Item</p>
              <p className="text-right w-28">Price</p>
            </div>
            {bills.map((item) => {
              return (
                <ItemCard
                  key={item.id}
                  {...item}
                  grandTotal={grandTotal}
                  total={subTotal}
                />
              );
            })}
          </>
        ) : (
          <div className="flex flex-col h-full items-center justify-center">
            <img
              alt="coins"
              src={Coins}
              className="object-contain w-full h-40"
            />
            <p className="text-xl text-center font-semibold mt-10 text-gray-700">
              Get your money back <br /> Split the bill now!
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
