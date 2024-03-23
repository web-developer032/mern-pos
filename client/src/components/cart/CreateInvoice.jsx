import { Form, Modal, Input, Select, Card, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CreateInvoice = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      var res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/invoices/add-invoice", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart?.total?.toFixed(2),
          // tax: ((cart.total * cart.tax) / 100).toFixed(2),
          // totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          totalAmount: cart.total.toFixed(2),
          cartItems: cart.cartItems,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (res.status === 200) {
        message.success("Invoice Created Successfully.");
        setIsModalOpen(false);
        dispatch(reset());
        navigate("/invoices");
      }
    } catch (error) {
      message.error("Operation Failed.");
      console.log(error);
    }
  };

  return (
    <Modal
      title="Create Invoice"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name={"customerName"}
          label="Customer name"
          rules={[{ required: true, message: "Please Write a Name!" }]}
        >
          <Input placeholder="Write Customer Name..." />
        </Form.Item>
        <Form.Item
          name={"customerPhoneNumber"}
          label="Phone number"
          rules={[{ required: true, message: "Please Write a Phone Number!" }]}
        >
          <Input placeholder="Write Your Phone Number..." maxLength={11} type="number" />
        </Form.Item>
        <Form.Item
          name={"paymentMode"}
          label="Payment method"
          rules={[{ required: true, message: "Please Write a Payment Method!" }]}
        >
          <Select placeholder="Select Payment Method...">
            <Select.Option value="found">Found</Select.Option>
            <Select.Option value="Credit card">Credit card</Select.Option>
          </Select>
        </Form.Item>
        <Card className="w-full">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{cart.total.toFixed(2) > 0 ? cart.total.toFixed(2) : 0}Rs</span>
          </div>
          {/* <div className="flex justify-between my-2">
            <span>KDV %{cart.tax}</span>
            <span className="text-red-600">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              Rs
            </span>
          </div> */}
          <div className="flex justify-between">
            <b>Total</b>
            {/* <b>
              {(cart.total + (cart.total * cart.tax) / 100).toFixed(2) > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              Rs
            </b> */}

            <b>
              {cart.total.toFixed(2) || 0}
              Rs
            </b>
          </div>
          <div className="flex justify-end">
            <Button
              size="medium"
              type="primary"
              className="mt-4"
              onClick={() => setIsModalOpen(true)}
              htmlType="submit"
            >
              Create Order
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};

export default CreateInvoice;
