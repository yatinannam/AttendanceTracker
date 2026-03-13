module.exports = [
"[project]/attendancetracker/AttendanceTracker/backend/src/use-cases/attendance-service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "markAttendance",
    ()=>markAttendance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$backend$2f$src$2f$infrastructure$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/backend/src/infrastructure/supabase/server.ts [app-rsc] (ecmascript)");
;
async function markAttendance({ meetingId, userId }) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$backend$2f$src$2f$infrastructure$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    // 1. Fetch meeting to validate time bounds
    const { data: meeting, error: meetingError } = await supabase.from('meetings').select('start_time, end_time, type, domain').eq('id', meetingId).single();
    if (meetingError || !meeting) {
        return {
            error: "Invalid meeting code."
        };
    }
    const now = new Date().getTime();
    const start = new Date(meeting.start_time).getTime();
    const end = new Date(meeting.end_time).getTime();
    // Strict Window Check
    if (now < start || now > end) {
        return {
            error: "Attendance closed for this meeting."
        };
    }
    // 2. Fetch User to validate Domain constraints (if applicable)
    if (meeting.type === 'Domain') {
        const { data: userData } = await supabase.from('users').select('domain').eq('id', userId).single();
        if (userData?.domain !== meeting.domain) {
            return {
                error: `This meeting is restricted to the ${meeting.domain} domain.`
            };
        }
    }
    // 3. Mark Present
    const { error: insertError } = await supabase.from('attendance').insert([
        {
            meeting_id: meetingId,
            user_id: userId,
            status: 'Present'
        }
    ]);
    if (insertError) {
        // If uniqueness constraint fails, they already scanned
        if (insertError.code === '23505') {
            return {
                error: "You have already marked your attendance for this meeting!"
            };
        }
        return {
            error: "Failed to record attendance."
        };
    }
    return {
        success: true
    };
}
}),
"[project]/attendancetracker/AttendanceTracker/frontend/src/app/member/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40c2339e63be92e34e54c3ec7000a420cd7dc63043":"markAttendanceAction"},"",""] */ __turbopack_context__.s([
    "markAttendanceAction",
    ()=>markAttendanceAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$backend$2f$src$2f$use$2d$cases$2f$attendance$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/backend/src/use-cases/attendance-service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$backend$2f$src$2f$infrastructure$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/backend/src/infrastructure/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function markAttendanceAction(meetingId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$backend$2f$src$2f$infrastructure$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return {
        error: "Unauthorized"
    };
    const { success, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$backend$2f$src$2f$use$2d$cases$2f$attendance$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markAttendance"])({
        meetingId,
        userId: user.id
    });
    if (error) {
        return {
            error
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/member');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/member/history');
    return {
        success: true
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    markAttendanceAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(markAttendanceAction, "40c2339e63be92e34e54c3ec7000a420cd7dc63043", null);
}),
"[project]/attendancetracker/AttendanceTracker/frontend/.next-internal/server/app/member/scan/page/actions.js { ACTIONS_MODULE0 => \"[project]/attendancetracker/AttendanceTracker/frontend/src/app/login/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/attendancetracker/AttendanceTracker/frontend/src/app/member/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/frontend/src/app/login/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$member$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/frontend/src/app/member/actions.ts [app-rsc] (ecmascript)");
;
;
;
;
}),
"[project]/attendancetracker/AttendanceTracker/frontend/.next-internal/server/app/member/scan/page/actions.js { ACTIONS_MODULE0 => \"[project]/attendancetracker/AttendanceTracker/frontend/src/app/login/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/attendancetracker/AttendanceTracker/frontend/src/app/member/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00b2c0282f9e28322486a42eef8ed1b800f58e6d71",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"],
    "408dbc0e569de2b138d6d74d68685624225070eedd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["login"],
    "40c2339e63be92e34e54c3ec7000a420cd7dc63043",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$member$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markAttendanceAction"],
    "40d903075103ed0b2e292c1c52191e4ae3e5fd6850",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signup"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f2e$next$2d$internal$2f$server$2f$app$2f$member$2f$scan$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$member$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/attendancetracker/AttendanceTracker/frontend/.next-internal/server/app/member/scan/page/actions.js { ACTIONS_MODULE0 => "[project]/attendancetracker/AttendanceTracker/frontend/src/app/login/actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/attendancetracker/AttendanceTracker/frontend/src/app/member/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/frontend/src/app/login/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$member$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/frontend/src/app/member/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=attendancetracker_AttendanceTracker_55ae91e3._.js.map