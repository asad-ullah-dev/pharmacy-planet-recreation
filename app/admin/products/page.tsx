"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Package,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  ArrowLeft,
  DollarSign,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Logout from "@/components/logout/Logout"
import { getAllMedicines, createMedicine, getMedicineById, updateMedicine, deleteMedicine } from "@/app/lib/api/medicineService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { useRouter,useParams } from "next/navigation";


type Medicine = {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  category: string;
  expiry_date: string;
};

  const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().typeError("Price must be a number").required("Price is required"),
  stock: yup.number().typeError("Stock must be a number").required("Stock is required"),
  expiry_date: yup.string().required("Expiry Date is required"),
});


export default function AdminProductsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = Number(params?.id);
  const [medicine, setMedicine] = useState<Medicine | null>(null);

    const fetchMedicine = async () => {
    try {
       const data = await getMedicineById(id);
      setMedicine(data);
    } catch (err) {
      console.error("Failed to load medicine", err);
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
  if (id) 
    fetchMedicine();
}, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [Formloading, setFormLoading] = useState(false);
  const [medicineDetail,setMedicineDetail] = useState("");
  const [products, setProducts] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    status: "Active",
  })
   const [loading, setLoading] = useState<boolean>(true);

   const handleSaveEdit = async () => {
  try {
    const updatedData = {
      name: editForm.name,
      description: editForm.description,
      price: parseFloat(editForm.price),
      stock: parseInt(editForm.stock),
      category: editForm.category,
      status: editForm.status,
    };

    await updateMedicine(selectedProduct.id, updatedData);

    toast.success("Product updated successfully");

    // UI update karo
    fetchMedicines();
    setIsEditModalOpen(false);
  } catch (error: any) {
    console.error("Update error:", error);
    toast.error("Failed to update product");
  }
};


   const fetchMedicines = async () => {
      try {
        const data = await getAllMedicines();
        console.log(data,'data')
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch medicines");
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchMedicines();
  }, []);
     
  const onSubmit = async (data: any) => {
    try {
      setFormLoading(true);
       await createMedicine(data);
      toast.success("Medicine created successfully");
      fetchMedicines();
      reset();
    } catch (error: any) {
      toast.error("Failed to create medicine");
      console.error("Error:", error);
    } finally {
      setFormLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200"
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: "text-red-600", label: "Out of Stock" }
    if (stock < 10) return { color: "text-yellow-600", label: "Low Stock" }
    return { color: "text-green-600", label: "In Stock" }
  }

  const handleView = async (id: number) => {
  setSelectedMedicineId(id);
  setIsModalOpen(true);
  setLoading(true);

  try {
     const data = await getMedicineById(id);
    setMedicineDetail(data);
  } catch (error) {
    console.error("Error loading medicine", error);
  } finally {
    setLoading(false);
  }
};

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      status: product.status,
    })
    setIsEditModalOpen(true)
  }

  const handleDeleteProduct = async (productId: number) => {
  try {
    await deleteMedicine(productId);
    toast.success("Product deleted successfully");
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  } catch (error) {
    console.error("Failed to delete product", error);
    toast.error("Failed to delete product");
  }
};


  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     <header className="bg-white shadow-sm border-b sticky top-0 z-50">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex justify-between items-center py-4">
                 <div className="flex items-center sm:space-x-4 space-x-2">
                   <Link href="/admin/dashboard">
                     <Button variant="ghost" size="sm" className="sm:text-sm text-xs sm:pr-3 pl-0 pr-1.5 sm:gap-2 gap-1">
                       <ArrowLeft className="sm:h-4 h-2 sm:w-4 w-2 sm:mr-2" />
                       Back to Dashboard
                     </Button>
                   </Link>
                   <div className="h-6 w-px bg-gray-300 sm:block hidden" />
                   <Image src="/images/ozempo-logo.png" alt="Ozempo Admin" width={120} height={40} className="h-8 sm:w-40 w-20" />
                   <Badge className="text-white text-xs sm:px-2 px-1 py-1" style={{ backgroundColor: "#14b8a6" }}>
                      ADMIN PANEL
                   </Badge>
                 </div>
                 <div>
                   <Logout />
                </div>
               </div>
             </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="md:text-3xl text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Package className="h-8 w-8 text-teal-600" />
              Product Management
            </h1>
            <p className="text-gray-600 mt-2">Manage your product catalog and inventory</p>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button
                className="text-white sm:text-sm text-xs sm:px-3 px-1.5 sm:gap-2 gap-1"
                style={{ backgroundColor: "#14b8a6" }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#0f766e")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#14b8a6")}
              >
                <Plus className="h-4 w-4 sm:mr-2" />
                Add New Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" placeholder="Enter product name" {...register("name")}/>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" placeholder="Enter category" {...register("category")}/>
                  </div>
                  <div>
                    <Label htmlFor="price">Price (£)</Label>
                    <Input id="price" type="number" placeholder="0.00" {...register("price")} />
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input id="stock" type="number" placeholder="0"  {...register("stock")} />
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock Quantity</Label>
                   <Input placeholder="Expiry Date (e.g. 2025-12-31)" type="date" {...register("expiry_date")} />
      
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter product description" {...register("description")} />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button
  className="text-white"
  style={{ backgroundColor: "#14b8a6" }}
  onClick={() => {
    setIsAddModalOpen(false);
    handleSubmit(onSubmit)();
  }}
>
          {Formloading ? "Submitting..." : "Add Product"}

  Add Product
</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                </div>
                <Package className="h-8 w-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Products</p>
                  <p className="text-2xl font-bold text-green-600">
                    {products.filter((p) => p.status === "Active").length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {products.filter((p) => p.stock < 10 && p.stock > 0).length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    £{products.reduce((sum, p) => sum + p.price * p.sales, 0).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {products.map((product) => {
          const stockStatus = getStockStatus(product.stock);

  return (
    <Card key={product.id}
    className="hover:shadow-md transition-shadow"
    onClick={() => router.push(`/admin/products/${product.id}`)}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">
              {product.name || "N/A"}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              {product.description || "N/A"}
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Price:</span>
                <span className="font-semibold text-gray-900">
                  £{product.price || "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Stock:</span>
                <span className={`font-medium ${stockStatus.color}`}>
                  {product.stock ?? "N/A"} ({stockStatus.label || "N/A"})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Sales:</span>
                <span className="font-medium text-gray-900">
                  {product.sales ?? "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <Badge className={getStatusColor(product.status)}>
                  {product.status || "N/A"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
    e.stopPropagation();
    handleView(product.id);
  }}
            className="flex-1"
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
    e.stopPropagation(); // Prevent card click
    handleEditProduct(product);
  }}
            className="flex-1"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
    e.stopPropagation(); // 🔥 stops card click
    handleDeleteProduct(product.id);
  }}
            className="text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
})}

        </div>

        {/* View Product Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Product Details</DialogTitle>
            </DialogHeader>
            {medicineDetail  && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Product Name</Label>
                    <p className="text-sm text-gray-900 mt-1">{medicine.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Category</Label>
                    <p className="text-sm text-gray-900 mt-1">{medicine.category}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Price</Label>
                    <p className="text-lg font-semibold text-gray-900 mt-1">£{medicine.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Stock</Label>
                    <p className="text-sm text-gray-900 mt-1">{medicine.stock} units</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-sm font-medium text-gray-600">Status</Label>
                    <Badge className={`${getStatusColor(medicine.status)} w-fit`}>{medicine.status}</Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Total Sales</Label>
                    <p className="text-sm text-gray-900 mt-1">{medicine.sales} units</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-600">Description</Label>
                    <p className="text-sm text-gray-900 mt-1">{medicine.description}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Product Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Product Name</Label>
                  <Input
                    id="edit-name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-category">Category</Label>
                  <Input
                    id="edit-category"
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-price">Price (£)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-stock">Stock Quantity</Label>
                  <Input
                    id="edit-stock"
                    type="number"
                    value={editForm.stock}
                    onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button className="text-white" style={{ backgroundColor: "#14b8a6" }} onClick={handleSaveEdit}>
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
