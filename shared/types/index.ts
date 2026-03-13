export type UserRole = 'admin' | 'member';
export type MeetingType = 'Club' | 'Domain' | 'Event';
export type AttendanceStatus = 'Present' | 'Absent';

export interface User {
    id: string;
    email: string;
    full_name: string;
    role: UserRole;
    domain?: string;
    created_at: string;
    updated_at: string;
}

export interface Meeting {
    id: string;
    title: string;
    type: MeetingType;
    start_time: string;
    end_time: string;
    qr_attendance_window: number;
    created_at: string;
    created_by: string;
}

export interface Attendance {
    id: string;
    meeting_id: string;
    user_id: string;
    status: AttendanceStatus;
    scanned_at: string;
}
