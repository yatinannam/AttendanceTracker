module.exports = [
"[project]/attendancetracker/AttendanceTracker/backend/src/use-cases/meeting-service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createMeeting",
    ()=>createMeeting,
    "updateMeetingMom",
    ()=>updateMeetingMom
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$backend$2f$src$2f$infrastructure$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/backend/src/infrastructure/supabase/server.ts [app-rsc] (ecmascript)");
;
async function createMeeting({ title, type, startTime, endTime, venue, agenda, domain, userId }) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$backend$2f$src$2f$infrastructure$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('meetings').insert([
        {
            title,
            type,
            start_time: new Date(startTime).toISOString(),
            end_time: new Date(endTime).toISOString(),
            venue,
            agenda,
            domain: type === 'Domain' ? domain : null,
            created_by: userId
        }
    ]).select().single();
    return {
        data,
        error: error?.message
    };
}
async function updateMeetingMom(meetingId, momText) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$backend$2f$src$2f$infrastructure$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.from('meetings').update({
        mom: momText
    }).eq('id', meetingId);
    return {
        error: error?.message
    };
}
}),
"[project]/attendancetracker/AttendanceTracker/frontend/src/app/admin/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40b0b8eccf1bad7ec04aca277d907236351bda00a2":"createMeetingAction","60b7ec885a9bb06b09a6187c12200fb6d0a5259190":"updateMeetingMomAction"},"",""] */ __turbopack_context__.s([
    "createMeetingAction",
    ()=>createMeetingAction,
    "updateMeetingMomAction",
    ()=>updateMeetingMomAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$backend$2f$src$2f$use$2d$cases$2f$meeting$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/backend/src/use-cases/meeting-service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$backend$2f$src$2f$infrastructure$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/backend/src/infrastructure/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function createMeetingAction(formData) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$backend$2f$src$2f$infrastructure$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    const title = formData.get('title');
    const type = formData.get('type');
    const startTime = formData.get('start_time');
    const endTime = formData.get('end_time');
    // New V2 Fields
    const venue = formData.get('venue');
    const agenda = formData.get('agenda');
    const domain = formData.get('domain');
    const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$backend$2f$src$2f$use$2d$cases$2f$meeting$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createMeeting"])({
        title,
        type,
        startTime,
        endTime,
        venue,
        agenda,
        domain,
        userId: user.id
    });
    if (error) {
        console.error("Error creating meeting", error);
        return {
            error
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/meetings');
    return {
        success: true,
        meetingId: data.id
    };
}
async function updateMeetingMomAction(meetingId, momText) {
    const { error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$backend$2f$src$2f$use$2d$cases$2f$meeting$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateMeetingMom"])(meetingId, momText);
    if (error) {
        console.error("Error updating MOM", error);
        return {
            error
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/meetings/${meetingId}`);
    return {
        success: true
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createMeetingAction,
    updateMeetingMomAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createMeetingAction, "40b0b8eccf1bad7ec04aca277d907236351bda00a2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateMeetingMomAction, "60b7ec885a9bb06b09a6187c12200fb6d0a5259190", null);
}),
"[project]/attendancetracker/AttendanceTracker/frontend/.next-internal/server/app/admin/meetings/page/actions.js { ACTIONS_MODULE0 => \"[project]/attendancetracker/AttendanceTracker/frontend/src/app/login/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/attendancetracker/AttendanceTracker/frontend/src/app/admin/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/frontend/src/app/login/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/frontend/src/app/admin/actions.ts [app-rsc] (ecmascript)");
;
;
;
;
}),
"[project]/attendancetracker/AttendanceTracker/frontend/.next-internal/server/app/admin/meetings/page/actions.js { ACTIONS_MODULE0 => \"[project]/attendancetracker/AttendanceTracker/frontend/src/app/login/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/attendancetracker/AttendanceTracker/frontend/src/app/admin/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00b2c0282f9e28322486a42eef8ed1b800f58e6d71",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"],
    "408dbc0e569de2b138d6d74d68685624225070eedd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["login"],
    "40b0b8eccf1bad7ec04aca277d907236351bda00a2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createMeetingAction"],
    "40d903075103ed0b2e292c1c52191e4ae3e5fd6850",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signup"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$meetings$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/attendancetracker/AttendanceTracker/frontend/.next-internal/server/app/admin/meetings/page/actions.js { ACTIONS_MODULE0 => "[project]/attendancetracker/AttendanceTracker/frontend/src/app/login/actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/attendancetracker/AttendanceTracker/frontend/src/app/admin/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/frontend/src/app/login/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/frontend/src/app/admin/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=attendancetracker_AttendanceTracker_4738b6d5._.js.map