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
import { Loader2, Save, Mail, Bell, Edit2, Check, X } from "lucide-react";
import { toast } from "sonner";

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
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Email & Notifications</h1>
                <p className="text-muted-foreground mt-2">
                    Manage system emails, templates, and platform-wide notification settings.
                </p>
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
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {templates.map((template) => (
                                    <TableRow key={template.template_key} className={editingKey === template.template_key ? "bg-muted/50" : ""}>
                                        <TableCell className="font-mono text-xs">{template.template_key}</TableCell>
                                        <TableCell>
                                            {editingKey === template.template_key ? (
                                                <Input
                                                    value={editForm.subject}
                                                    onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                                                    className="h-8 text-sm"
                                                />
                                            ) : (
                                                <span className="text-sm">{template.subject}</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editingKey === template.template_key ? (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-7 text-[10px]"
                                                    onClick={() => setEditForm({ ...editForm, is_enabled: !editForm.is_enabled })}
                                                >
                                                    {editForm.is_enabled ? "Enabled" : "Disabled"}
                                                </Button>
                                            ) : (
                                                <Badge variant={template.is_enabled ? "default" : "secondary"} className="h-5 text-[10px]">
                                                    {template.is_enabled ? "Active" : "Paused"}
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {editingKey === template.template_key ? (
                                                <div className="flex justify-end gap-1">
                                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={cancelEditing}>
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                    <Button size="sm" className="h-8 w-8 p-0" onClick={saveTemplate} disabled={saving}>
                                                        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => startEditing(template)}>
                                                    <Edit2 className="h-3.5 w-3.5" />
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {editingKey && (
                        <div className="mt-6 space-y-4 p-4 border rounded-lg bg-muted/20 animate-in fade-in slide-in-from-bottom-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">HTML Content Editor</h3>
                                <p className="text-[10px] text-muted-foreground italic truncate max-w-[200px]">Editing: {editingKey}</p>
                            </div>
                            <Textarea
                                value={editForm.body_html}
                                onChange={(e) => setEditForm({ ...editForm, body_html: e.target.value })}
                                className="min-h-[200px] font-mono text-xs bg-background"
                                placeholder="Paste your HTML template here..."
                            />
                            <div className="flex justify-between items-center text-[10px] text-muted-foreground">
                                <div>Tags: <code>{"{{organizer_name}}"}</code>, <code>{"{{vendor_name}}"}</code>, <code>{"{{event_title}}"}</code></div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={cancelEditing}>Cancel</Button>
                                    <Button size="sm" className="h-7 text-xs" onClick={saveTemplate} disabled={saving}>
                                        {saving ? "Saving..." : "Save Changes"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
