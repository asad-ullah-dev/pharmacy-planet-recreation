"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logout from "@/components/logout/Logout";
import {
  getAllMedicines,
  createMedicine,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
} from "@/lib/api/medicineService";
import { Medicine } from "@/lib/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// FilePond imports (will be installed)
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

registerPlugin(FilePondPluginImagePreview);

// Add client-side check
const isClient = typeof window !== "undefined";

// Force dynamic rendering to prevent SSR localStorage issues
export const dynamic = "force-dynamic";

// Extended Medicine type for local use
type ExtendedMedicine = Medicine & {
  short_description?: string;
  sales?: number;
  images?: string[];
  total_sold?: number;
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),
  stock: yup
    .number()
    .typeError("Stock must be a number")
    .required("Stock is required"),
  expiry_date: yup.string().required("Expiry Date is required"),
  short_description: yup.string().required("Short description is required"),
  status: yup.string().required("Status is required"),
  // images: yup.array().min(1, "At least one image is required"), // optional
});

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<ExtendedMedicine[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] =
    useState<ExtendedMedicine | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [medicineDetail, setMedicineDetail] = useState<ExtendedMedicine | null>(
    null
  );
  const [productToDelete, setProductToDelete] =
    useState<ExtendedMedicine | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    status: "Active" as "Active" | "Inactive",
    expiry_date: "",
    short_description: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [editFiles, setEditFiles] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchMedicines = async (searchTerm?: string) => {
    try {
      if (searchTerm) {
        setSearchLoading(true);
      } else {
        setLoading(true);
      }
      const data = await getAllMedicines(searchTerm);
      setProducts(data);
    } catch (error) {
      toast.error("Failed to fetch medicines");
      console.error("Failed to fetch medicines:", error);
    } finally {
      if (searchTerm) {
        setSearchLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchMedicines(searchTerm.trim());
      } else if (searchTerm === "") {
        fetchMedicines();
      }
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const onSubmit = async (data: any) => {
    try {
      setFormLoading(true);

      // Create FormData
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      files
        .filter((fileItem) => fileItem?.file)
        .forEach((fileItem, index) => {
          formData.append(`images[${index}]`, fileItem.file);
        });

      // Send FormData to your API
      await createMedicine(formData);

      toast.success("Medicine created successfully");
      fetchMedicines();
      reset();
      setFiles([]);
      setIsAddModalOpen(false);
    } catch (error) {
      toast.error("Failed to create medicine");
      console.error("Error creating medicine:", error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditFilePondUpdate = (fileItems: any[]) => {
    // Only keep sources for local files (existing images)

    setEditFiles(fileItems);
  };

  const handleSaveEdit = async () => {
    if (!selectedProduct) return;
    try {
      console.log(existingImages, "existingImages");
      setEditLoading(true);
      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("description", editForm.description);
      formData.append("short_description", editForm.short_description);
      formData.append("expiry_date", editForm.expiry_date);
      formData.append("_method", "PUT");
      formData.append("price", editForm.price);
      formData.append("stock", editForm.stock);
      formData.append("category", editForm.category);
      formData.append("status", editForm.status);
      // Add existing images
      existingImages.forEach((url, idx) => {
        formData.append(`existing_images[${idx}]`, url);
      });

      // Add new images if files exist
      const newFiles = editFiles.filter((item) => item.file);
      if (newFiles.length > 0) {
        newFiles.forEach((item, idx) => {
          formData.append(`images[${idx}]`, item.file);
        });
      }
      await updateMedicine(selectedProduct.id, formData);
      toast.success("Product updated successfully");
      fetchMedicines();
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to update product");
      console.error("Update error:", error);
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteClick = (product: ExtendedMedicine) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      setDeleteLoading(true);
      await deleteMedicine(productToDelete.id);
      toast.success("Product deleted successfully");
      setProducts((prev) =>
        prev.filter((product) => product.id !== productToDelete.id)
      );
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (error) {
      toast.error("Failed to delete product");
      console.error("Delete error:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleView = async (id: number) => {
    try {
      const medicine = await getMedicineById(id);
      setMedicineDetail(medicine);
      setIsViewModalOpen(true);
    } catch (error) {
      toast.error("Error fetching medicine details");
      console.error("Error fetching medicine details:", error);
    }
  };

  const handleEditProduct = async (product: ExtendedMedicine) => {
    try {
      const latest = await getMedicineById(product.id);
      setSelectedProduct(latest as ExtendedMedicine);
      setEditForm({
        name: latest.name || "",
        description: latest.description || "",
        price: latest.price?.toString() || "",
        stock: latest.stock?.toString() || "",
        category: latest.category || "",
        status: latest.status || "Active",
        expiry_date: latest.expiry_date || "",
        short_description: (latest as any).short_description || "",
      });
      // Set up FilePond for existing images (with preview)
      const imgs = (latest as any).images || [];
      setExistingImages(imgs);

      setIsEditModalOpen(true);
    } catch (err) {
      toast.error("Failed to fetch product details");
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: "text-red-600", label: "Out of Stock" };
    if (stock < 10) return { color: "text-yellow-600", label: "Low Stock" };
    return { color: "text-green-600", label: "In Stock" };
  };

  // Remove client-side filtering since we're now using API search
  const filteredProducts = products;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading medicines...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center sm:space-x-4 space-x-2">
              <Link href="/admin/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className="sm:text-sm text-xs sm:pr-3 pl-0 pr-1.5 sm:gap-2 gap-1"
                >
                  <ArrowLeft className="sm:h-4 h-2 sm:w-4 w-2 sm:mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300 sm:block hidden" />
              <Image
                src="/images/ozempo-logo.png"
                alt="Ozempo Admin"
                width={120}
                height={40}
                className="h-8 sm:w-40 w-20"
              />
              <Badge
                className="text-white text-xs sm:px-2 px-1 py-1"
                style={{ backgroundColor: "#14b8a6" }}
              >
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
            <p className="text-gray-600 mt-2">
              Manage your product catalog and inventory
            </p>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button
                className="text-white sm:text-sm text-xs sm:px-3 px-1.5 sm:gap-2 gap-1"
                style={{
                  backgroundColor: isAddModalOpen ? "#0f766e" : "#14b8a6",
                }}
              >
                <Plus className="h-4 w-4 sm:mr-2" />
                Add New Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter product name"
                      {...register("name")}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      placeholder="Enter category"
                      {...register("category")}
                      className={errors.category ? "border-red-500" : ""}
                    />
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="price">Price (£)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      {...register("price")}
                      className={errors.price ? "border-red-500" : ""}
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input
                      id="stock"
                      type="number"
                      placeholder="0"
                      {...register("stock")}
                      className={errors.stock ? "border-red-500" : ""}
                    />
                    {errors.stock && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.stock.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="expiry_date">Expiry Date</Label>
                    <Input
                      placeholder="Expiry Date (e.g. 2025-12-31)"
                      type="date"
                      {...register("expiry_date")}
                      className={errors.expiry_date ? "border-red-500" : ""}
                    />
                    {errors.expiry_date && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.expiry_date.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter product description"
                    {...register("description")}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="short_description">Short Description</Label>
                  <Input
                    id="short_description"
                    placeholder="Enter short description"
                    {...register("short_description")}
                    className={errors.short_description ? "border-red-500" : ""}
                  />
                  {errors.short_description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.short_description.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="images">Images (Multiple)</Label>
                  <FilePond
                    files={files}
                    onupdatefiles={setFiles}
                    allowMultiple={true}
                    maxFiles={5}
                    name="images"
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    {...register("status")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="text-white"
                    style={{ backgroundColor: "#14b8a6" }}
                    disabled={formLoading}
                  >
                    {formLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Submitting...
                      </div>
                    ) : (
                      "Add Product"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Products
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {products.length}
                  </p>
                </div>
                <Package className="h-8 w-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Products
                  </p>
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
                  <p className="text-sm font-medium text-gray-600">
                    Low Stock Items
                  </p>
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
                  <p className="text-sm font-medium text-gray-600">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    £
                    {products
                      .reduce((sum, p) => sum + p.price * (p.sales || 0), 0)
                      .toLocaleString()}
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
                disabled={searchLoading}
              />
              {searchLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-500"></div>
                </div>
              )}
            </div>
            {searchTerm && (
              <p className="text-sm text-gray-500 mt-2">
                Searching for: "{searchTerm}"
              </p>
            )}
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const stockStatus = getStockStatus(product.stock);

            return (
              <Card
                key={product.id}
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
                            {product.stock ?? "N/A"} (
                            {stockStatus.label || "N/A"})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Sales:</span>
                          <span className="font-medium text-gray-900">
                            {product.total_sold ?? "N/A"}
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
                        e.stopPropagation();
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
                        e.stopPropagation();
                        handleDeleteClick(product);
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or add a new product.
            </p>
          </div>
        )}

        {/* View Product Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Product Details</DialogTitle>
            </DialogHeader>
            {medicineDetail && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Product Name
                    </Label>
                    <p className="text-sm text-gray-900 mt-1">
                      {medicineDetail.name}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Category
                    </Label>
                    <p className="text-sm text-gray-900 mt-1">
                      {medicineDetail.category}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Price
                    </Label>
                    <p className="text-lg font-semibold text-gray-900 mt-1">
                      £
                      {typeof medicineDetail.price === "number"
                        ? medicineDetail.price.toFixed(2)
                        : parseFloat(medicineDetail.price || "0").toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Stock
                    </Label>
                    <p className="text-sm text-gray-900 mt-1">
                      {medicineDetail.stock} units
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-sm font-medium text-gray-600">
                      Status
                    </Label>
                    <Badge
                      className={`${getStatusColor(
                        medicineDetail.status
                      )} w-fit`}
                    >
                      {medicineDetail.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Total Sales
                    </Label>
                    <p className="text-sm text-gray-900 mt-1">
                      {medicineDetail.sales || 0} units
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-600">
                      Description
                    </Label>
                    <p className="text-sm text-gray-900 mt-1">
                      {medicineDetail.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Product Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit();
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Product Name</Label>
                  <Input
                    id="edit-name"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-category">Category</Label>
                  <Input
                    id="edit-category"
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-price">Price (£)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm({ ...editForm, price: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-stock">Stock Quantity</Label>
                  <Input
                    id="edit-stock"
                    type="number"
                    value={editForm.stock}
                    onChange={(e) =>
                      setEditForm({ ...editForm, stock: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-expiry_date">Expiry Date</Label>
                  <Input
                    id="edit-expiry_date"
                    type="date"
                    value={editForm.expiry_date}
                    onChange={(e) =>
                      setEditForm({ ...editForm, expiry_date: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-short_description">
                  Short Description
                </Label>
                <Input
                  id="edit-short_description"
                  value={editForm.short_description}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      short_description: e.target.value,
                    })
                  }
                />
              </div>
              {/* Removed Existing Images preview and delete UI, as images are not part of editForm */}
              <div>
                <Label>Existing Images</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
                  {existingImages.map((image, index) => (
                    <div key={index} className="relative">
                      <button
                        onClick={() => {
                          setExistingImages(
                            existingImages.filter((_, i) => i !== index)
                          );
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <Image
                        src={image}
                        alt={`Product image ${index + 1}`}
                        width={200}
                        height={200}
                        className="rounded-lg object-cover w-full h-32"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="edit-images">Images (Multiple)</Label>
                <FilePond
                  files={editFiles}
                  onupdatefiles={handleEditFilePondUpdate}
                  allowMultiple={true}
                  maxFiles={5}
                  name="images"
                  labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                />
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={editForm.status}
                  onValueChange={(value) =>
                    setEditForm({
                      ...editForm,
                      status: value as "Active" | "Inactive",
                    })
                  }
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="text-white"
                  style={{ backgroundColor: "#14b8a6" }}
                  type="submit"
                  disabled={editLoading}
                >
                  {editLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent className="max-w-md">
            {productToDelete && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                    <Trash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Are you sure you want to delete this product?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    This action cannot be undone. The product "
                    {productToDelete.name}" will be permanently removed from
                    your catalog.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium text-gray-900">
                      {productToDelete.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      Category: {productToDelete.category}
                    </p>
                    <p className="text-xs text-gray-600">
                      Price: £{productToDelete.price}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                      setProductToDelete(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white"
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Deleting...
                      </div>
                    ) : (
                      "Delete Product"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
