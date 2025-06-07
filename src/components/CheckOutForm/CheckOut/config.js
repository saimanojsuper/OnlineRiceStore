import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

const steps = [ {
    name: "Shipping address",
    component: AddressForm
},
{
    name: "Payment details",
    component: PaymentForm
},
{
    name: "success",
    component: ()=>( <>"Success"</>)
}]

export default steps;
