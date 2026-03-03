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
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@bventy/ui";
import { Loader2, Mail, Search, Eye, Clock, RotateCcw } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function EmailLogsPage() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLog, setSelectedLog] = useState<any>(null);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const data = await adminService.getEmailLogs();
            setLogs(data);
        } catch (error) {
            console.error("Failed to fetch email logs", error);
            toast.error("Failed to load email logs.");
        } finally {
            setLoading(false);
        }
    };

    const filteredLogs = logs.filter(log =>
        log.to_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.template_key && log.template_key.toLowerCase().includes(searchTerm.toLowerCase()))
    );

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
                    <h1 className="text-3xl font-bold tracking-tight">Email Logs</h1>
                    <p className="text-muted-foreground mt-2">
                        View all outgoing system emails from the last 30 days.
                    </p>
                </div>
                <Button variant="outline" size="sm" onClick={fetchLogs} className="w-fit">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Refresh Logs
                </Button>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle>History</CardTitle>
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by email, subject or template..."
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Recipient</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Template</TableHead>
                                    <TableHead>Sent At</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredLogs.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            No logs found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredLogs.map((log) => (
                                        <TableRow key={log.id}>
                                            <TableCell className="font-medium">{log.to_email}</TableCell>
                                            <TableCell>
                                                <span className="truncate max-w-[250px] block">{log.subject}</span>
                                            </TableCell>
                                            <TableCell>
                                                {log.template_key ? (
                                                    <Badge variant="outline" className="font-mono text-[10px]">
                                                        {log.template_key}
                                                    </Badge>
                                                ) : (
                                                    <span className="text-muted-foreground text-xs">Direct</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {format(new Date(log.sent_at), "MMM d, h:mm a")}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => setSelectedLog(log)}
                                                        >
                                                            <Eye className="h-4 w-4 mr-1" />
                                                            View
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                                                        <DialogHeader>
                                                            <DialogTitle>Email Content Preview</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="space-y-4 pt-4">
                                                            <div className="grid grid-cols-4 gap-2 text-sm border-b pb-4">
                                                                <div className="font-bold text-muted-foreground">To:</div>
                                                                <div className="col-span-3">{selectedLog?.to_email}</div>
                                                                <div className="font-bold text-muted-foreground">Subject:</div>
                                                                <div className="col-span-3">{selectedLog?.subject}</div>
                                                                <div className="font-bold text-muted-foreground">Sent:</div>
                                                                <div className="col-span-3">
                                                                    {selectedLog && format(new Date(selectedLog.sent_at), "eeee, MMMM do yyyy 'at' h:mm:ss a")}
                                                                </div>
                                                            </div>
                                                            <div className="bg-white rounded-md border p-6 text-black overflow-x-auto min-h-[200px]">
                                                                <div dangerouslySetInnerHTML={{ __html: selectedLog?.body_html }} />
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
