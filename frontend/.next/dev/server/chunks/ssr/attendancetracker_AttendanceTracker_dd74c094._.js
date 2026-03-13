module.exports = [
"[project]/attendancetracker/AttendanceTracker/backend/src/infrastructure/supabase/server.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/node_modules/@supabase/ssr/dist/module/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/node_modules/next/headers.js [app-rsc] (ecmascript)");
;
;
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://pnnfztafsxanzjuylckp.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBubmZ6dGFmc3hhbnpqdXlsY2twIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyOTgyNDEsImV4cCI6MjA4ODg3NDI0MX0.3XBKZE6KKbyLMZhmUMk5ZtbdsrkIas-i744Mfdbp0bY"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>{
                        cookieStore.set(name, value, options);
                    });
                } catch (error) {
                // The `set` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing user sessions.
                }
            }
        }
    });
}
}),
"[project]/attendancetracker/AttendanceTracker/backend/src/use-cases/auth-service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loginUser",
    ()=>loginUser,
    "logoutUser",
    ()=>logoutUser,
    "signupUser",
    ()=>signupUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$backend$2f$src$2f$infrastructure$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/backend/src/infrastructure/supabase/server.ts [app-rsc] (ecmascript)");
;
async function loginUser(email, password) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$backend$2f$src$2f$infrastructure$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    return {
        error
    };
}
async function signupUser(email, password, fullName) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$backend$2f$src$2f$infrastructure$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName
            }
        }
    });
    return {
        error
    };
}
async function logoutUser() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$backend$2f$src$2f$infrastructure$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    await supabase.auth.signOut();
}
}),
"[project]/attendancetracker/AttendanceTracker/frontend/src/app/login/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00b2c0282f9e28322486a42eef8ed1b800f58e6d71":"logout","408dbc0e569de2b138d6d74d68685624225070eedd":"login","40d903075103ed0b2e292c1c52191e4ae3e5fd6850":"signup"},"",""] */ __turbopack_context__.s([
    "login",
    ()=>login,
    "logout",
    ()=>logout,
    "signup",
    ()=>signup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$backend$2f$src$2f$use$2d$cases$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/backend/src/use-cases/auth-service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function login(formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    const { error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$backend$2f$src$2f$use$2d$cases$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loginUser"])(email, password);
    if (error) {
        console.error("Login Error:", error.message);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`/login?message=${encodeURIComponent(error.message)}`);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/', 'layout');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/');
}
async function signup(formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    const fullName = email // Using email as full name initially for minimal setup
    ;
    const { error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$backend$2f$src$2f$use$2d$cases$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signupUser"])(email, password, fullName);
    if (error) {
        console.error("Signup Error:", error.message);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`/login?message=${encodeURIComponent(error.message)}`);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/', 'layout');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/login?message=Check email to continue sign in process');
}
async function logout() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$backend$2f$src$2f$use$2d$cases$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logoutUser"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/login');
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    login,
    signup,
    logout
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(login, "408dbc0e569de2b138d6d74d68685624225070eedd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(signup, "40d903075103ed0b2e292c1c52191e4ae3e5fd6850", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logout, "00b2c0282f9e28322486a42eef8ed1b800f58e6d71", null);
}),
"[project]/attendancetracker/AttendanceTracker/frontend/.next-internal/server/app/login/page/actions.js { ACTIONS_MODULE0 => \"[project]/attendancetracker/AttendanceTracker/frontend/src/app/login/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/frontend/src/app/login/actions.ts [app-rsc] (ecmascript)");
;
;
;
}),
"[project]/attendancetracker/AttendanceTracker/frontend/.next-internal/server/app/login/page/actions.js { ACTIONS_MODULE0 => \"[project]/attendancetracker/AttendanceTracker/frontend/src/app/login/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00b2c0282f9e28322486a42eef8ed1b800f58e6d71",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"],
    "408dbc0e569de2b138d6d74d68685624225070eedd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["login"],
    "40d903075103ed0b2e292c1c52191e4ae3e5fd6850",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signup"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f2e$next$2d$internal$2f$server$2f$app$2f$login$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/attendancetracker/AttendanceTracker/frontend/.next-internal/server/app/login/page/actions.js { ACTIONS_MODULE0 => "[project]/attendancetracker/AttendanceTracker/frontend/src/app/login/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$attendancetracker$2f$AttendanceTracker$2f$frontend$2f$src$2f$app$2f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/attendancetracker/AttendanceTracker/frontend/src/app/login/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=attendancetracker_AttendanceTracker_dd74c094._.js.map