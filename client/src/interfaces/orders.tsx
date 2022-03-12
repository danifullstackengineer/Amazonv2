import IProduct from "./products";

export default interface IOrder {
  orders:
    | {
        _id: string;
        amount: number;
        basket: IProduct[];
        createdAt: Date;
        paymentId: string;
        userId: string;
      }[]
}
