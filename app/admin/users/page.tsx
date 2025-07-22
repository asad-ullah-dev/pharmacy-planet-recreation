"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  ArrowLeft,
  UserCheck,
  UserX,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logout from "@/components/logout/Logout";
import {
  getAllUsers,
  getUserById,
  User,
  UsersResponse,
  createUser,
  CreateUserData,
  updateUser,
  deleteUser,
  toggleUserStatus,
} from "@/lib/api/userService";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";

// Validation schema for user creation
const userSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  date_of_birth: yup.string().required("Date of birth is required"),
  phone_number: yup.string().required("Phone number is required"),
  gender: yup.string().required("Gender is required"),
  street_address: yup.string().required("Street address is required"),
  county: yup.string(),
  city: yup.string().required("City is required"),
  zip_postal_code: yup.string().required("Postal code is required"),
  ethnicity: yup.string().required("Ethnicity is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
  role_id: yup.number().required("Role is required"),
  status: yup.string().required("Status is required"),
});

export default function AdminUsersPage() {
  const router = useRouter();
  const [usersData, setUsersData] = useState<UsersResponse | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [filterLoading, setFilterLoading] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    phone_number: "",
    gender: "",
    street_address: "",
    county: "",
    city: "",
    zip_postal_code: "",
    ethnicity: "",
    email: "",
    role_id: 2,
    status: "active",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const fetchUsers = async (searchTerm?: string, statusFilter?: string) => {
    try {
      if (searchTerm || (statusFilter && statusFilter !== "all")) {
        setSearchLoading(true);
      } else {
        setLoading(true);
      }
      const data = await getAllUsers(searchTerm, statusFilter);
      setUsersData(data);
      setUsers(data.users.data);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error("Failed to fetch users:", error);
    } finally {
      if (searchTerm || (statusFilter && statusFilter !== "all")) {
        setSearchLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchUsers(searchTerm.trim(), statusFilter);
      } else if (searchTerm === "") {
        fetchUsers(undefined, statusFilter);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, statusFilter]);

  const onSubmit = async (data: CreateUserData) => {
    try {
      setFormLoading(true);
      await createUser(data);
      toast.success("User created successfully");
      fetchUsers();
      reset();
      setIsAddModalOpen(false);
    } catch (error) {
      toast.error("Failed to create user");
      console.error("Error creating user:", error);
    } finally {
      setFormLoading(false);
    }
  };

  const isEditFormChanged = () => {
    if (!selectedUser) return false;
    // Compare each field in editForm with selectedUser
    return (
      editForm.first_name !== selectedUser.first_name ||
      editForm.last_name !== selectedUser.last_name ||
      editForm.date_of_birth !== selectedUser.date_of_birth ||
      editForm.phone_number !== selectedUser.phone_number ||
      editForm.gender !== selectedUser.gender ||
      editForm.street_address !== selectedUser.street_address ||
      editForm.county !== selectedUser.county ||
      editForm.city !== selectedUser.city ||
      editForm.zip_postal_code !== selectedUser.zip_postal_code ||
      editForm.ethnicity !== selectedUser.ethnicity ||
      editForm.email !== selectedUser.email ||
      editForm.role_id !== selectedUser.role_id ||
      editForm.status !== selectedUser.status
    );
  };

  const handleSaveEdit = async () => {
    if (!selectedUser) return;
    if (!isEditFormChanged()) {
      toast.info("No changes detected.");
      setIsEditModalOpen(false);
      return;
    }
    try {
      setEditLoading(true);
      await updateUser(selectedUser.id, editForm);
      toast.success("User updated successfully");
      fetchUsers();
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to update user");
      console.error("Update error:", error);
    } finally {
      setEditLoading(false);
    }
  };

  const handleEditUser = async (user: User) => {
    try {
      const latest = await getUserById(user.id);
      setSelectedUser(latest);
      setEditForm({
        first_name: latest.first_name || "",
        last_name: latest.last_name || "",
        date_of_birth: latest.date_of_birth || "",
        phone_number: latest.phone_number || "",
        gender: latest.gender || "",
        street_address: latest.street_address || "",
        county: latest.county || "",
        city: latest.city || "",
        zip_postal_code: latest.zip_postal_code || "",
        ethnicity: latest.ethnicity || "",
        email: latest.email || "",
        role_id: latest.role_id || 2,
        status: latest.status || "active",
      });
      setIsEditModalOpen(true);
    } catch (err) {
      toast.error("Failed to fetch user details");
    }
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;

    try {
      setDeleteLoading(true);
      await deleteUser(userToDelete.id);
      toast.success("User deleted successfully");
      setUsers((prev) => prev.filter((user) => user.id !== userToDelete.id));
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      toast.error("Failed to delete user");
      console.error("Delete error:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      `${user.first_name} ${user.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      user.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  const handleViewUser = (user: User) => {
    router.push(`/admin/users/${user.id}`);
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleToggleUserStatus = async (userId: number) => {
    try {
      await toggleUserStatus(userId);
      setUsers(
        users.map((user) =>
          user.id === userId
            ? {
                ...user,
                status: user.status === "active" ? "inactive" : "active",
              }
            : user
        )
      );
      toast.success("User status updated successfully");
    } catch (error) {
      toast.error("Failed to update user status");
      console.error("Error updating user status:", error);
    }
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setFilterLoading(true);
    fetchUsers(searchTerm, value).finally(() => {
      setFilterLoading(false);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
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
              <Users className="h-8 w-8 text-teal-600" />
              User Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and monitor user accounts
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
                Add New User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      placeholder="Enter first name"
                      {...register("first_name")}
                      className={errors.first_name ? "border-red-500" : ""}
                    />
                    {errors.first_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.first_name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      placeholder="Enter last name"
                      {...register("last_name")}
                      className={errors.last_name ? "border-red-500" : ""}
                    />
                    {errors.last_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.last_name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      {...register("email")}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone_number">Phone Number</Label>
                    <Input
                      id="phone_number"
                      placeholder="Enter phone number"
                      {...register("phone_number")}
                      className={errors.phone_number ? "border-red-500" : ""}
                    />
                    {errors.phone_number && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone_number.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="date_of_birth">Date of Birth</Label>
                    <Input
                      id="date_of_birth"
                      type="date"
                      {...register("date_of_birth")}
                      className={errors.date_of_birth ? "border-red-500" : ""}
                    />
                    {errors.date_of_birth && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.date_of_birth.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            id="gender"
                            className={errors.gender ? "border-red-500" : ""}
                          >
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.gender && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="ethnicity">Ethnicity</Label>
                    <Input
                      id="ethnicity"
                      placeholder="Enter ethnicity"
                      {...register("ethnicity")}
                      className={errors.ethnicity ? "border-red-500" : ""}
                    />
                    {errors.ethnicity && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.ethnicity.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="role_id">Role</Label>
                    <Controller
                      name="role_id"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={(value) =>
                            field.onChange(parseInt(value))
                          }
                          value={field.value?.toString()}
                        >
                          <SelectTrigger
                            id="role_id"
                            className={errors.role_id ? "border-red-500" : ""}
                          >
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Admin</SelectItem>
                            <SelectItem value="2">User</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.role_id && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.role_id.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            id="status"
                            className={errors.status ? "border-red-500" : ""}
                          >
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.status && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.status.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="street_address">Street Address</Label>
                    <Input
                      id="street_address"
                      placeholder="Enter street address"
                      {...register("street_address")}
                      className={errors.street_address ? "border-red-500" : ""}
                    />
                    {errors.street_address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.street_address.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="Enter city"
                      {...register("city")}
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="county">County</Label>
                    <Input
                      id="county"
                      placeholder="Enter county (optional)"
                      {...register("county")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip_postal_code">Postal Code</Label>
                    <Input
                      id="zip_postal_code"
                      placeholder="Enter postal code"
                      {...register("zip_postal_code")}
                      className={errors.zip_postal_code ? "border-red-500" : ""}
                    />
                    {errors.zip_postal_code && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.zip_postal_code.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      {...register("password")}
                      className={errors.password ? "border-red-500" : ""}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="password_confirmation">
                      Confirm Password
                    </Label>
                    <Input
                      id="password_confirmation"
                      type="password"
                      placeholder="Confirm password"
                      {...register("password_confirmation")}
                      className={
                        errors.password_confirmation ? "border-red-500" : ""
                      }
                    />
                    {errors.password_confirmation && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password_confirmation.message}
                      </p>
                    )}
                  </div>
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
                        Creating...
                      </div>
                    ) : (
                      "Create User"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {usersData?.totals.total_users || 0}
                  </p>
                </div>
                <Users className="h-8 w-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Users
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {usersData?.totals.active_users || 0}
                  </p>
                </div>
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Inactive Users
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {usersData?.totals.inactive_users || 0}
                  </p>
                </div>
                <UserX className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    New This Month
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {usersData?.totals.new_this_month || 0}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search users by name or email..."
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
              </div>
              <div className="sm:w-48">
                <Select
                  value={statusFilter}
                  onValueChange={handleStatusFilterChange}
                  disabled={filterLoading}
                >
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                {filterLoading && (
                  <div className="mt-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-500"></div>
                  </div>
                )}
              </div>
            </div>
            {(searchTerm || (statusFilter && statusFilter !== "all")) && (
              <p className="text-sm text-gray-500 mt-2">
                {searchTerm && statusFilter !== "all"
                  ? `Searching for: "${searchTerm}" and filtering by: ${statusFilter}`
                  : searchTerm
                  ? `Searching for: "${searchTerm}"`
                  : `Filtering by: ${statusFilter}`}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users ({users.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      User
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Contact
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Location
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Join Date
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{`${user.first_name} ${user.last_name}`}</div>
                          <div className="text-sm text-gray-600">
                            {user.email}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="text-sm text-gray-900">
                            {user.email}
                          </div>
                          <div className="text-sm text-gray-600">
                            {user.phone_number}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(user.status)}>
                          {user.status.charAt(0).toUpperCase() +
                            user.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-gray-900">{user.city}</div>
                        <div className="text-sm text-gray-600">
                          {user.county || "N/A"}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Link href={`/admin/users/${user.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleUserStatus(user.id)}
                            className={
                              user.status === "active"
                                ? "text-red-600"
                                : "text-green-600"
                            }
                          >
                            {user.status === "active" ? (
                              <UserX className="h-4 w-4" />
                            ) : (
                              <UserCheck className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteClick(user)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {users.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No users found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters, or add a new user.
            </p>
          </div>
        )}

        {/* Edit User Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
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
                  <Label htmlFor="edit-first_name">First Name</Label>
                  <Input
                    id="edit-first_name"
                    value={editForm.first_name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, first_name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-last_name">Last Name</Label>
                  <Input
                    id="edit-last_name"
                    value={editForm.last_name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, last_name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-phone_number">Phone Number</Label>
                  <Input
                    id="edit-phone_number"
                    value={editForm.phone_number}
                    onChange={(e) =>
                      setEditForm({ ...editForm, phone_number: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-date_of_birth">Date of Birth</Label>
                  <Input
                    id="edit-date_of_birth"
                    type="date"
                    value={editForm.date_of_birth}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        date_of_birth: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-gender">Gender</Label>
                  <Select
                    value={editForm.gender}
                    onValueChange={(value) =>
                      setEditForm({ ...editForm, gender: value })
                    }
                  >
                    <SelectTrigger id="edit-gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-ethnicity">Ethnicity</Label>
                  <Input
                    id="edit-ethnicity"
                    value={editForm.ethnicity}
                    onChange={(e) =>
                      setEditForm({ ...editForm, ethnicity: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-role_id">Role</Label>
                  <Select
                    value={editForm.role_id.toString()}
                    onValueChange={(value) =>
                      setEditForm({ ...editForm, role_id: parseInt(value) })
                    }
                  >
                    <SelectTrigger id="edit-role_id">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Admin</SelectItem>
                      <SelectItem value="2">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editForm.status}
                    onValueChange={(value) =>
                      setEditForm({ ...editForm, status: value })
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-street_address">Street Address</Label>
                  <Input
                    id="edit-street_address"
                    value={editForm.street_address}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        street_address: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-city">City</Label>
                  <Input
                    id="edit-city"
                    value={editForm.city}
                    onChange={(e) =>
                      setEditForm({ ...editForm, city: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-county">County</Label>
                  <Input
                    id="edit-county"
                    value={editForm.county}
                    onChange={(e) =>
                      setEditForm({ ...editForm, county: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-zip_postal_code">Postal Code</Label>
                  <Input
                    id="edit-zip_postal_code"
                    value={editForm.zip_postal_code}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        zip_postal_code: e.target.value,
                      })
                    }
                  />
                </div>
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
            {userToDelete && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                    <Trash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Are you sure you want to delete this user?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    This action cannot be undone. The user "
                    {userToDelete.first_name} {userToDelete.last_name}" will be
                    permanently removed from your system.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium text-gray-900">
                      {userToDelete.first_name} {userToDelete.last_name}
                    </p>
                    <p className="text-xs text-gray-600">
                      Email: {userToDelete.email}
                    </p>
                    <p className="text-xs text-gray-600">
                      Role: {userToDelete.role?.name || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                      setUserToDelete(null);
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
                      "Delete User"
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
