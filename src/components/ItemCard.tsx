import numeral from "numeral";
import { Bill } from "store/app/types";

interface Props extends Bill {
  grandTotal: number;
  total: number;
}

function ItemCard({ id, orders, name, grandTotal, total }: Props) {
  const subtotal = orders.reduce(
    (acc, item) => acc + item.price * (item.amount || 0),
    0
  ); // 0 is the initial value of acc

  const ratio = Math.round((subtotal / total) * 100);

  return (
    <div className="flex flex-col mt-5">
      <div className="flex flex-row items-center">
        <img
          className="w-12 h-12 rounded-full border border-orange-600"
          alt="profile"
          src={`https://avatars.dicebear.com/api/micah/${id}.svg`} // https://avatars.dicebear.com/api/avataaars/diddo.svg
        />
        <p className="ml-3 text-lg capitalize">{name}</p>
      </div>
      <div className="py-2">
        {orders.map((item) => (
          <div key={item.id} className="flex flex-row mb-1">
            <div className="flex flex-1 capitalize">
              <p>
                {item.orderName || "-"}{" "}
                {item.orderName && `(${item.amount || 1} pcs)`}
              </p>
            </div>
            <p className="text-right w-28 font-bold">
              Rp. {numeral(item.price).format("0,0")}
            </p>
          </div>
        ))}
        <>
          <hr className="my-2" />
          <div className="flex flex-row mb-1">
            <div className="flex flex-1 capitalize">
              <p className="font-medium">Subtotal</p>
            </div>
            <p className="text-right w-28 font-bold">
              Rp. {numeral(subtotal).format("0,0")}
            </p>
          </div>
        </>
        <>
          <hr className="my-2" />
          <div className="flex flex-row mb-1">
            <div className="flex flex-1 capitalize">
              <p className="font-medium">Ratio</p>
            </div>
            <p className="text-right w-28 font-bold">
              {numeral(grandTotal).format("0,0")} x {ratio}%
            </p>
          </div>
        </>
        <>
          <hr className="my-2" />
          <div className="flex flex-row mb-1">
            <div className="flex flex-1 capitalize">
              <p className="font-medium">Grand Total</p>
            </div>
            <p className="text-right w-28 font-bold">
              Rp. {numeral(grandTotal * (ratio / 100)).format("0,0")}
            </p>
          </div>
        </>
      </div>
    </div>
  );
}

export default ItemCard;
