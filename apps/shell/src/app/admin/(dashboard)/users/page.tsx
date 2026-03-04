"use client";

import { useEffect, useState } from "react";
import { adminService } from "@bventy/services";
import { UserProfile } from "@bventy/services";
import { useAuth } from "@bventy/services";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@bventy/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bventy/ui";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@bventy/ui";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@bventy/ui";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@bventy/ui";
import { Button } from "@bventy/ui";
import { Trash2, User, Mail, Shield, Calendar, MapPin, Check } from "lucide-react";
import { format } from "date-fns";

interface UserDetailsModalProps {
    user: UserProfile | null;
    open: boolean;
    onClose: () => void;
    onDelete: (userId: string) => Promise<void>;
    onRoleChange: (userId: string, newRole: string) => Promise<void>;
    onVerify: (userId: string) => Promise<void>;
    onUnverify: (userId: string) => Promise<void>;
    canManageRoles: boolean;
    canManageUsers: boolean;
}

function UserDetailsModal({ user, open, onClose, onDelete, onRoleChange, onVerify, onUnverify, canManageRoles, canManageUsers }: UserDetailsModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    if (!user) return null;

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await onDelete(user.id);
            onClose();
        } finally {
            setIsDeleting(false);
            setShowConfirm(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>User Profile</DialogTitle>
                    <DialogDescription>
                        Detailed information for {user.full_name || user.username}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user.profile_image_url} alt={user.full_name} />
                            <AvatarFallback className="text-2xl">
                                {(user.full_name || user.username || "U").charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-xl font-bold">{user.full_name || "N/A"}</h2>
                            <p className="text-sm text-muted-foreground">@{user.username}</p>
                            <Badge className="mt-2 capitalize" variant="secondary">{user.role}</Badge>
                        </div>
                    </div>

                    <div className="grid gap-3 border-t pt-4">
                        <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Email:</span>
                            <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">City:</span>
                            <span>{user.city || "Not specified"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Joined:</span>
                            <span>{user.created_at ? format(new Date(user.created_at as string), "PPP") : "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Shield className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Verification:</span>
                            {user.email_verified ? (
                                <Badge variant="default" className="bg-green-500 hover:bg-green-600">Verified</Badge>
                            ) : (
                                <Badge variant="destructive">Unverified</Badge>
                            )}
                        </div>
                    </div>

                    {canManageUsers && (
                        <div className="flex flex-col gap-2 border-t pt-4">
                            <h3 className="text-sm font-semibold">Verification Controls</h3>
                            <p className="text-xs text-muted-foreground">Manually override the email verification status for this user.</p>
                            <div className="flex gap-2 mt-1">
                                {user.email_verified ? (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onUnverify(user.id)}
                                        disabled={isVerifying}
                                        className="text-amber-600 border-amber-200 hover:bg-amber-50"
                                    >
                                        {isVerifying ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : <Shield className="h-3 w-3 mr-2" />}
                                        Mark as Unverified
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onVerify(user.id)}
                                        disabled={isVerifying}
                                        className="text-green-600 border-green-200 hover:bg-green-50"
                                    >
                                        {isVerifying ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : <Check className="h-3 w-3 mr-2" />}
                                        Verify User Now
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}

                    {user.bio && (
                        <div className="border-t pt-4">
                            <h3 className="text-sm font-semibold mb-1">Bio</h3>
                            <p className="text-sm text-muted-foreground italic">"{user.bio}"</p>
                        </div>
                    )}
                </div>

                <DialogFooter className="sm:justify-between border-t pt-4">
                    {canManageUsers ? (
                        showConfirm ? (
                            <div className="flex items-center gap-2 w-full">
                                <p className="text-xs text-destructive font-semibold flex-1">Are you absolutely sure?</p>
                                <Button variant="ghost" size="sm" onClick={() => setShowConfirm(false)}>Cancel</Button>
                                <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isDeleting}>
                                    {isDeleting && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                                    Confirm Delete
                                </Button>
                            </div>
                        ) : (
                            <Button variant="destructive" size="sm" onClick={() => setShowConfirm(true)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete User
                            </Button>
                        )
                    ) : <div />}
                    <Button variant="outline" size="sm" onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default function AdminUsersPage() {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchUsers = async () => {
        try {
            const data = await adminService.getUsers();
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users", error);
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = async (userId: string, newRole: string) => {
        try {
            await adminService.updateUserRole(userId, newRole);
            toast.success("User role updated");
            setUsers((prev) =>
                prev.map((u) => (u.id === userId ? { ...u, role: newRole as any } : u))
            );
            if (selectedUser?.id === userId) {
                setSelectedUser(prev => prev ? { ...prev, role: newRole as any } : null);
            }
        } catch (error) {
            console.error("Failed to update role", error);
            toast.error("Failed to update user role");
        }
    };

    const handleDeleteUser = async (userId: string) => {
        try {
            await adminService.deleteUser(userId);
            toast.success("User deleted successfully");
            setUsers((prev) => prev.filter((u) => u.id !== userId));
        } catch (error) {
            console.error("Failed to delete user", error);
            toast.error("Failed to delete user");
        }
    };

    const handleVerifyUser = async (userId: string) => {
        try {
            await adminService.verifyUser(userId);
            toast.success("User verified manually");
            setUsers((prev) =>
                prev.map((u) => (u.id === userId ? { ...u, email_verified: true } : u))
            );
            if (selectedUser?.id === userId) {
                setSelectedUser(prev => prev ? { ...prev, email_verified: true } : null);
            }
        } catch (error) {
            toast.error("Failed to verify user");
        }
    };

    const handleUnverifyUser = async (userId: string) => {
        try {
            await adminService.unverifyUser(userId);
            toast.success("User verification removed");
            setUsers((prev) =>
                prev.map((u) => (u.id === userId ? { ...u, email_verified: false } : u))
            );
            if (selectedUser?.id === userId) {
                setSelectedUser(prev => prev ? { ...prev, email_verified: false } : null);
            }
        } catch (error) {
            toast.error("Failed to unverify user");
        }
    };

    const openUserDetails = (user: UserProfile) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    if (loading) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    const canManageUsers = ["admin", "super_admin"].includes(currentUser?.role || "");
    const canManageRoles = currentUser?.role === "super_admin";

    const canDeleteUser = (targetUser: UserProfile) => {
        if (!currentUser) return false;
        if (targetUser.id === currentUser.id) return false; // Can't delete self
        if (currentUser.role === "super_admin") return true; // Super Admin can delete anyone else
        if (currentUser.role === "admin") {
            // Admin can only delete users with lower roles (staff, user)
            return !["admin", "super_admin"].includes(targetUser.role);
        }
        return false;
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Avatar</TableHead>
                            <TableHead>Start Info</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Current Role</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                className="cursor-pointer hover:bg-muted/50"
                                onClick={() => openUserDetails(user)}
                            >
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage
                                            src={user.profile_image_url}
                                            alt={user.username || user.full_name}
                                        />
                                        <AvatarFallback>
                                            {(user.full_name || user.username || "U")
                                                .charAt(0)
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">
                                            {user.full_name || "N/A"}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            @{user.username}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="capitalize">
                                            {user.role}
                                        </Badge>
                                        {user.email_verified ? (
                                            <Check className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <Shield className="h-4 w-4 text-muted-foreground opacity-50" />
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                                    {canManageUsers ? (
                                        <div className="flex items-center justify-end gap-2">
                                            {canManageRoles ? (
                                                <Select
                                                    value={user.role}
                                                    onValueChange={(value) =>
                                                        handleRoleChange(user.id, value)
                                                    }
                                                >
                                                    <SelectTrigger className="w-[130px]">
                                                        <SelectValue placeholder="Select role" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="user">User</SelectItem>
                                                        <SelectItem value="staff">Staff</SelectItem>
                                                        <SelectItem value="admin">Admin</SelectItem>
                                                        <SelectItem value="super_admin">
                                                            Super Admin
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <Badge variant="outline" className="capitalize">{user.role}</Badge>
                                            )}
                                            {canDeleteUser(user) && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openUserDetails(user);
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="text-sm text-muted-foreground italic">
                                            View Only
                                        </span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <UserDetailsModal
                user={selectedUser}
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onDelete={handleDeleteUser}
                onRoleChange={handleRoleChange}
                onVerify={handleVerifyUser}
                onUnverify={handleUnverifyUser}
                canManageRoles={canManageRoles}
                canManageUsers={canManageUsers && !!selectedUser && canDeleteUser(selectedUser)}
            />
        </div>
    );
}
