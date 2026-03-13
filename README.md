# Club Attendance System

A modern QR-based attendance management system for student clubs.
This platform allows administrators to organize meetings and automatically track attendance using dynamic QR codes, while members can easily mark their presence and view meeting records.

The system is built as a web application with a scalable architecture so it can later be converted into a mobile app if required.

---

## Overview

Many clubs still rely on manual attendance tracking, which often leads to missing records, proxy attendance, and administrative overhead.
This project provides a structured digital solution where meetings can be created, attendance can be marked by scanning QR codes, and engagement data can be stored centrally.

The platform supports both **club-wide meetings** and **domain-specific meetings**, making it flexible for organizations with multiple departments or teams.

---

## Key Features

### QR-Based Attendance

Admins generate a dynamic QR code for each meeting. Members scan the QR code to mark their attendance instantly.

### Time Restricted Attendance

Attendance can only be marked during the meeting window defined by the admin.
If a meeting runs from **5:00 PM to 7:00 PM**, scans after **7:00 PM are automatically rejected**.

### Automatic Absence Tracking

Once the meeting ends, members who did not scan the QR code are automatically marked as **Absent**.

### Club Meetings and Domain Meetings

Admins can create two types of meetings:

* **Club Meeting** – applies to all members
* **Domain Meeting** – applies only to members of a specific domain

Supported domains:

* Technical
* Creative
* Operations
* Outreach
* Sponsorship

### Meeting Details

Each meeting stores:

* Meeting Title
* Date and Time
* Venue
* Agenda
* Meeting Type (Club / Domain)
* Domain (if applicable)

### Minutes of Meeting (MOM)

Admins can upload or update **Minutes of Meeting (MOM)** after the meeting.
Members can view these notes from their dashboard.

### Admin Analytics

For every meeting the admin can see:

* Total members
* Members present
* Members absent

### Member Dashboard

Members can view:

* Meeting details
* Attendance status
* Agenda and MOM
* Attendance history

---

## Tech Stack

Frontend

* Next.js
* TypeScript
* Tailwind CSS

Backend

* Supabase

Database

* PostgreSQL (via Supabase)

Libraries

* html5-qrcode (QR scanner)
* qrcode.react (QR generation)
* lucide-react (icons)

Authentication

* Supabase Auth

---

## Database Structure

### Users

Stores member information.

Fields include:

* id
* email
* full_name
* role
* domain

### Meetings

Stores meeting metadata.

Fields include:

* title
* type (Club / Domain)
* domain
* start_time
* end_time
* venue
* agenda
* mom

### Attendance

Tracks attendance records.

Fields include:

* meeting_id
* user_id
* status (Present / Absent)
* scanned_at

---

## Attendance Logic

1. Admin creates a meeting.
2. A QR code is generated for that meeting.
3. Members scan the QR code to mark attendance.
4. If the meeting window is active, the member is marked **Present**.
5. If the meeting ends and a member has not scanned, they are automatically marked **Absent**.

Domain meetings only apply to members belonging to that specific domain.

---

## Security

The project uses **Row Level Security (RLS)** in Supabase to enforce permissions.

Rules include:

* Members can only insert attendance for themselves.
* Members can view their own attendance.
* Admins can create and update meetings.
* Admins can view all attendance data.

---

## Setup Instructions

### 1. Clone the Repository

```
git clone <your-repo-url>
cd club-attendance-system
```

### 2. Install Dependencies

```
npm install
```

### 3. Create a Supabase Project

Create a new project at
https://supabase.com

Then retrieve:

* Project URL
* Publishable / Anon API Key

---

### 4. Configure Environment Variables

Create a `.env.local` file in the project root.

Example:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

---

### 5. Setup Database

Open the Supabase dashboard and go to **SQL Editor**.

Run the SQL inside:

```
schema.sql
```

This will create:

* tables
* enums
* RLS policies
* triggers

---

### 6. Run the Development Server

```
npm run dev
```

Open:

```
http://localhost:3000
```

---

## Project Structure

```
src
 ├── app
 ├── components
 ├── lib
 ├── types
 └── hooks
```

---

## Future Improvements

Potential enhancements include:

* GPS verification to prevent proxy attendance
* Dynamic QR tokens that refresh periodically
* Offline attendance sync
* Mobile app version
* Role-based admin hierarchy
* Meeting reminders and notifications

---

## License

This project is intended for educational and organizational use within student clubs.

---

## Author

Built as a project to simplify attendance management and improve organizational transparency in student communities.
