"use client";

import { useEffect, useState } from "react";
import { adminService } from "@bventy/services";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Button,
    Input,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Badge,
    Textarea
} from "@bventy/ui";
import { Loader2, Save, Mail, Bell, Edit2, Check, X, History } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function EmailManagementPage() {
    const [templates, setTemplates] = useState<any[]>([]);
    const [settings, setSettings] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [editingKey, setEditingKey] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [templatesData, settingsData] = await Promise.all([
                adminService.getEmailTemplates(),
                adminService.getPlatformSettings(),
            ]);
            setTemplates(templatesData);
            setSettings(settingsData);
        } catch (error) {
            console.error("Failed to fetch email management data", error);
            toast.error("Failed to load settings.");
        } finally {
            setLoading(false);
        }
    };

    const handleToggleNotifs = async () => {
        const newValue = settings.quote_email_notifications_enabled === "true" ? "false" : "true";
        try {
            await adminService.updatePlatformSetting("quote_email_notifications_enabled", newValue);
            setSettings({ ...settings, quote_email_notifications_enabled: newValue });
            toast.success(`Notifications ${newValue === "true" ? "enabled" : "disabled"}`);
        } catch (error) {
            toast.error("Failed to update setting.");
        }
    };

    const startEditing = (template: any) => {
        setEditingKey(template.template_key);
        setEditForm({ ...template });
    };

    const cancelEditing = () => {
        setEditingKey(null);
        setEditForm({});
    };

    const saveTemplate = async () => {
        setSaving(true);
        try {
            await adminService.updateEmailTemplate(editingKey!, {
                subject: editForm.subject,
                body_html: editForm.body_html,
                is_enabled: editForm.is_enabled,
                from_name: editForm.from_name,
                from_email: editForm.from_email,
            });
            toast.success("Template updated successfully!");
            setEditingKey(null);
            fetchData();
        } catch (error) {
            toast.error("Failed to update template.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Email & Notifications</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage system emails, templates, and platform-wide notification settings.
                    </p>
                </div>
                <Link href="/admin/email/logs">
                    <Button variant="outline">
                        <History className="h-4 w-4 mr-2" />
                        View Send Logs
                    </Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg dark:bg-blue-900/30 dark:text-blue-400">
                                <Bell className="h-4 w-4" />
                            </div>
                            <CardTitle className="text-lg">Notifications</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between py-2">
                            <div className="space-y-0.5">
                                <div className="text-sm font-medium">Quote Notifications</div>
                                <div className="text-xs text-muted-foreground">Send emails for quote requests & updates</div>
                            </div>
                            {/* We use a simple button as toggle if Switch is not in UI, or just check its presence */}
                            <Button
                                variant={settings.quote_email_notifications_enabled === "true" ? "default" : "outline"}
                                size="sm"
                                onClick={handleToggleNotifs}
                            >
                                {settings.quote_email_notifications_enabled === "true" ? "Enabled" : "Disabled"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg dark:bg-emerald-900/30 dark:text-emerald-400">
                                <Mail className="h-4 w-4" />
                            </div>
                            <CardTitle className="text-lg">Service Provider</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm font-medium">Resend</div>
                        <div className="text-xs text-muted-foreground mt-1">Status: Active</div>
                        <div className="mt-4 flex items-center gap-2">
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Operational</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Email Templates</CardTitle>
                    <CardDescription>Customize the content of outgoing system emails.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Template Key</TableHead>
                                    <TableHead>Sender</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {templates.map((template) => (
                                    <TableRow key={template.template_key} className={editingKey === template.template_key ? "bg-primary/5 border-l-4 border-l-primary" : ""}>
                                        <TableCell className="font-mono text-xs font-bold">{template.template_key}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-medium">{template.from_name || "Default"}</span>
                                                <span className="text-[10px] text-muted-foreground">{template.from_email || "default@bventy.in"}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm truncate max-w-[200px] block">{template.subject}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={template.is_enabled ? "default" : "secondary"} className="h-5 text-[10px]">
                                                {template.is_enabled ? "Active" : "Paused"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                size="sm"
                                                variant={editingKey === template.template_key ? "secondary" : "ghost"}
                                                className="h-8 px-3"
                                                onClick={() => editingKey === template.template_key ? cancelEditing() : startEditing(template)}
                                            >
                                                {editingKey === template.template_key ? (
                                                    <X className="h-3.5 w-3.5 mr-1" />
                                                ) : (
                                                    <Edit2 className="h-3.5 w-3.5 mr-1" />
                                                )}
                                                {editingKey === template.template_key ? "Cancel" : "Edit"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {editingKey && (
                        <div className="mt-8 space-y-6 p-6 border-2 border-primary/20 rounded-xl bg-primary/5 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className="flex items-center justify-between border-b pb-4">
                                <div>
                                    <h3 className="text-lg font-bold">Edit Email Template</h3>
                                    <p className="text-xs text-muted-foreground font-mono">{editingKey}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={cancelEditing}>Cancel</Button>
                                    <Button size="sm" onClick={saveTemplate} disabled={saving}>
                                        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                        Save Changes
                                    </Button>
                                </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Subject Line</label>
                                        <Input
                                            value={editForm.subject}
                                            onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                                            placeholder="Enter email subject"
                                            className="bg-background shadow-sm"
                                        />
                                    </div>
                                    <div className="grid gap-4 grid-cols-2">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">From Name</label>
                                            <Input
                                                value={editForm.from_name || ""}
                                                onChange={(e) => setEditForm({ ...editForm, from_name: e.target.value })}
                                                placeholder="e.g. Bventy Team"
                                                className="bg-background shadow-sm"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">From Email</label>
                                            <Input
                                                value={editForm.from_email || ""}
                                                onChange={(e) => setEditForm({ ...editForm, from_email: e.target.value })}
                                                placeholder="e.g. hello@bventy.in"
                                                className="bg-background shadow-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 pt-2">
                                        <label className="text-sm font-medium">Template Status:</label>
                                        <Button
                                            variant={editForm.is_enabled ? "default" : "outline"}
                                            size="sm"
                                            className="h-8"
                                            onClick={() => setEditForm({ ...editForm, is_enabled: !editForm.is_enabled })}
                                        >
                                            {editForm.is_enabled ? "Enabled (Active)" : "Disabled (Paused)"}
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-1.5 flex flex-col h-full mt-[-0px]">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">HTML Body Content</label>
                                    <Textarea
                                        value={editForm.body_html}
                                        onChange={(e) => setEditForm({ ...editForm, body_html: e.target.value })}
                                        className="flex-1 min-h-[300px] font-mono text-xs bg-background shadow-sm resize-none"
                                        placeholder="Paste your HTML template here..."
                                    />
                                    <div className="pt-2">
                                        <p className="text-[10px] text-muted-foreground">
                                            Available Dynamic Tags:
                                            <code className="ml-1 px-1 bg-muted rounded">{"{{organizer_name}}"}</code>
                                            <code className="ml-1 px-1 bg-muted rounded">{"{{vendor_name}}"}</code>
                                            <code className="ml-1 px-1 bg-muted rounded">{"{{event_title}}"}</code>
                                            <code className="ml-1 px-1 bg-muted rounded">{"{{verification_code}}"}</code>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
