import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_PRODUCT } from "@/app/services/product";
import { AuthContext } from "@/app/context/authContext";
import PopupText from "@/app/components/popupText";

const DeleteProductForm = () => {
  const { token, role } = useContext(AuthContext);
  const [deleteFormData, setDeleteFormData] = useState({ productId: "", productName: "" });
  const [deleteProduct, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_PRODUCT);
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  if (role !== "admin") return null;

  const handleDeleteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteFormData({ ...deleteFormData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await deleteProduct({
        variables: { id: deleteFormData.productId, name: deleteFormData.productName },
        context: { headers: { authorization: `Bearer ${token}` } },
      });
      // Optionally trigger a refetch or show a success message.
      setVisible(true);
      setText("Product deleted successfully");
      setDeleteFormData({ productId: "", productName: "" });
    } catch (err) {
      console.error("Error deleting product:", err);
      setVisible(true);
      setText("Error deleting product");
    }
  };

  return (
    <div className="mb-6 px-6">
      <form onSubmit={handleDelete} className="bg-white p-6 rounded shadow-md max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Delete Product</h2>
        <div className="mb-4">
          <label className="block font-medium mb-1">Product ID*</label>
          <input
            type="text"
            name="productId"
            className="w-full border rounded px-3 py-2"
            value={deleteFormData.productId}
            onChange={handleDeleteChange}
            required
          />
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="productName"
            className="w-full border rounded px-3 py-2"
            value={deleteFormData.productName}
            onChange={handleDeleteChange}

          />
        </div>
        <button
          type="submit"
          disabled={deleteLoading}
          className={`w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 ${deleteLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {deleteLoading ? "Deleting..." : "Delete Product"}
        </button>
        {deleteError && <p className="text-red-600 mt-4">Error: {deleteError.message}</p>}
      </form>
      <PopupText
        message={text}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </div>


  );
};

export default DeleteProductForm;
