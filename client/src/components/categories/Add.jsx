import { Button, Form, Input, Modal, message } from "antd";
import { useAddCategoryMutation } from "../../services/categories";

const Add = ({ isAddModalOpen, setIsAddModalOpen, categories, setCategories }) => {
  const [form] = Form.useForm();
  const [addCategory] = useAddCategoryMutation();

  const onFinish = async (value) => {
    const { data, error } = await addCategory(value);

    if (data) {
      message.success("Category added successfully.");
      setIsAddModalOpen(false);
      form.resetFields();
      setCategories([
        ...categories,
        {
          _id: Math.random(),
          title: value.title,
        },
      ]);
    } else {
      message.error("Something went wrong!");
    }
  };

  return (
    <Modal
      title="Add New Category"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label={"Category Name"}
          name="title"
          rules={[
            {
              required: true,
              message: "This Field Cannot Be Left Empty!",
            },
          ]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
