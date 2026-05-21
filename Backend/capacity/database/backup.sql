--
-- PostgreSQL database dump
--

\restrict Vri5es9aotrC43NfMw7hQfhMc7SzGIQI2GQzNAe0kvqprYMeDjLCezVYhtqvagl

-- Dumped from database version 18.4 (Debian 18.4-1.pgdg13+1)
-- Dumped by pg_dump version 18.4 (Debian 18.4-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: epic_teams; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.epic_teams (
    epic_id bigint NOT NULL,
    team_id bigint NOT NULL
);


ALTER TABLE public.epic_teams OWNER TO "user";

--
-- Name: epics; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.epics (
    id bigint NOT NULL,
    initiative_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    effort numeric(10,2),
    status character varying(255),
    required_fte numeric(10,2),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.epics OWNER TO "user";

--
-- Name: epics_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.epics_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.epics_id_seq OWNER TO "user";

--
-- Name: epics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.epics_id_seq OWNED BY public.epics.id;


--
-- Name: initiatives; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.initiatives (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    start_date date NOT NULL,
    end_date date,
    owner character varying(255),
    strategic_objective character varying(255),
    delivery_confidence numeric(5,2),
    predicted_completion date,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.initiatives OWNER TO "user";

--
-- Name: initiatives_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.initiatives_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.initiatives_id_seq OWNER TO "user";

--
-- Name: initiatives_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.initiatives_id_seq OWNED BY public.initiatives.id;


--
-- Name: persons; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.persons (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    vacation_days integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.persons OWNER TO "user";

--
-- Name: persons_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.persons_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.persons_id_seq OWNER TO "user";

--
-- Name: persons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.persons_id_seq OWNED BY public.persons.id;


--
-- Name: quarters; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.quarters (
    id bigint NOT NULL,
    year_id bigint NOT NULL,
    quarter_number integer NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    total_working_days integer NOT NULL,
    CONSTRAINT quarters_quarter_number_check CHECK (((quarter_number >= 1) AND (quarter_number <= 4)))
);


ALTER TABLE public.quarters OWNER TO "user";

--
-- Name: quarters_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.quarters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quarters_id_seq OWNER TO "user";

--
-- Name: quarters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.quarters_id_seq OWNED BY public.quarters.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.roles (
    id bigint NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.roles OWNER TO "user";

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO "user";

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: team_capacity; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.team_capacity (
    id bigint NOT NULL,
    team_id bigint NOT NULL,
    year integer NOT NULL,
    quarter integer NOT NULL,
    effective_capacity numeric(10,2) NOT NULL,
    CONSTRAINT team_capacity_quarter_check CHECK (((quarter >= 1) AND (quarter <= 4)))
);


ALTER TABLE public.team_capacity OWNER TO "user";

--
-- Name: team_capacity_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.team_capacity_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.team_capacity_id_seq OWNER TO "user";

--
-- Name: team_capacity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.team_capacity_id_seq OWNED BY public.team_capacity.id;


--
-- Name: team_persons; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.team_persons (
    team_id bigint NOT NULL,
    person_id bigint NOT NULL
);


ALTER TABLE public.team_persons OWNER TO "user";

--
-- Name: teams; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.teams (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    department character varying(255) NOT NULL,
    support_overhead numeric(5,2) NOT NULL,
    team_lead character varying(255) NOT NULL,
    allocation character varying(255),
    duration character varying(255),
    total_effort character varying(255),
    risk character varying(255)
);


ALTER TABLE public.teams OWNER TO "user";

--
-- Name: teams_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.teams_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.teams_id_seq OWNER TO "user";

--
-- Name: teams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.teams_id_seq OWNED BY public.teams.id;


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.user_roles (
    user_id bigint NOT NULL,
    role_id bigint NOT NULL
);


ALTER TABLE public.user_roles OWNER TO "user";

--
-- Name: users; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    enabled boolean DEFAULT true
);


ALTER TABLE public.users OWNER TO "user";

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO "user";

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: years; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.years (
    id bigint NOT NULL,
    year integer NOT NULL
);


ALTER TABLE public.years OWNER TO "user";

--
-- Name: years_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.years_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.years_id_seq OWNER TO "user";

--
-- Name: years_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.years_id_seq OWNED BY public.years.id;


--
-- Name: epics id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.epics ALTER COLUMN id SET DEFAULT nextval('public.epics_id_seq'::regclass);


--
-- Name: initiatives id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.initiatives ALTER COLUMN id SET DEFAULT nextval('public.initiatives_id_seq'::regclass);


--
-- Name: persons id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.persons ALTER COLUMN id SET DEFAULT nextval('public.persons_id_seq'::regclass);


--
-- Name: quarters id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.quarters ALTER COLUMN id SET DEFAULT nextval('public.quarters_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: team_capacity id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.team_capacity ALTER COLUMN id SET DEFAULT nextval('public.team_capacity_id_seq'::regclass);


--
-- Name: teams id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.teams ALTER COLUMN id SET DEFAULT nextval('public.teams_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: years id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.years ALTER COLUMN id SET DEFAULT nextval('public.years_id_seq'::regclass);


--
-- Data for Name: epic_teams; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.epic_teams (epic_id, team_id) FROM stdin;
4	1
\.


--
-- Data for Name: epics; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.epics (id, initiative_id, name, effort, status, required_fte, created_at, updated_at) FROM stdin;
4	1	Core AI Model	400.00	IN_PROGRESS	3.50	2026-05-21 15:04:30.509119	2026-05-21 15:04:30.509119
8	1	Data Connector	250.00	IN_PROGRESS	3.50	2026-05-21 15:06:11.089905	2026-05-21 15:06:11.089905
6	1	Internal API	250.00	COMPLETE	3.50	2026-05-21 15:05:31.504711	2026-05-21 15:05:31.504711
7	1	UI / Dashboard	300.00	PLANNED	3.50	2026-05-21 15:05:50.110058	2026-05-21 15:05:50.110058
\.


--
-- Data for Name: initiatives; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.initiatives (id, name, description, start_date, end_date, owner, strategic_objective, delivery_confidence, predicted_completion, created_at, updated_at) FROM stdin;
5	Data Platform Modernization	Modernize the enterprise data platform by migrating legacy ETL pipelines, improving data governance, and enabling scalable real-time analytics capabilities.	2026-08-01	2027-06-30	Michael Chen	Improve scalability, reliability, and data-driven decision making across the organization	84.50	2027-05-15	2026-05-20 21:12:38.330862	2026-05-20 21:12:38.330862
6	AI Analytics Platform	Build an AI-powered analytics platform that enables predictive insights, automated reporting, and real-time business intelligence across enterprise systems.	2026-09-01	2027-09-30	Emma Rodriguez	Accelerate data-driven decision making and improve operational efficiency through AI-enabled analytics	79.25	2027-08-15	2026-05-20 21:14:05.65634	2026-05-20 21:14:05.65634
7	Mobile App Expansion	Expand the mobile application platform with new customer engagement features, offline capabilities, push notification services, and enhanced performance across iOS and Android devices.	2026-10-01	2027-07-31	Daniel Foster	Increase mobile user adoption, engagement, and customer retention through an enhanced mobile experience	81.75	2027-06-15	2026-05-20 21:14:50.427797	2026-05-20 21:14:50.427797
8	Security Enhancement	Strengthen enterprise security capabilities by implementing multi-factor authentication, advanced threat detection, centralized identity management, and proactive vulnerability remediation across core systems.	2026-11-01	2027-08-31	Olivia Bennett	Improve cybersecurity resilience, reduce operational risk, and ensure compliance with enterprise security standards	88.00	2027-07-20	2026-05-20 21:15:31.03794	2026-05-20 21:15:31.03794
9	Operational Excellence	Drive operational efficiency through process automation, infrastructure optimization, improved service reliability, and standardized engineering practices across business and technology teams.	2026-12-01	2027-10-31	James Walker	Reduce operational costs, improve delivery efficiency, and enhance organizational scalability	86.25	2027-09-15	2026-05-20 21:16:00.79706	2026-05-20 21:16:00.79706
10	New Market Expansion	Expand business operations into new regional and international markets by enabling localized digital experiences, scalable infrastructure, regulatory compliance capabilities, and market-specific product offerings.	2027-01-15	2028-03-31	Sophia Martinez	Increase revenue growth and global market presence through strategic expansion initiatives	74.80	2028-02-10	2026-05-20 21:17:25.050892	2026-05-20 21:17:25.050892
1	Test 2 Customer Portal Revamp	Test Modernize the customer portal UX and improve self-service capabilities.	2026-07-01	2027-03-31	John Doe	Test Improve customer retention and digital engagement	92.00	2027-02-16	2026-05-20 20:38:05.892632	2026-05-20 20:38:05.892632
\.


--
-- Data for Name: persons; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.persons (id, name, vacation_days) FROM stdin;
1	Alice	20
2	Bob	10
3	Charlie	5
4	David	7
5	Eve	15
6	Frank	17
7	Grace	18
8	Henry	21
9	Ivy	17
10	Jack	13
11	Karen	14
12	Leo	18
\.


--
-- Data for Name: quarters; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.quarters (id, year_id, quarter_number, start_date, end_date, total_working_days) FROM stdin;
1	1	1	2026-01-01	2026-03-31	64
2	1	2	2026-04-01	2026-06-30	65
3	1	3	2026-07-01	2026-09-30	66
4	1	4	2026-10-01	2026-12-31	66
5	2	1	2027-01-01	2027-03-31	64
6	2	2	2027-04-01	2027-06-30	65
7	2	3	2027-07-01	2027-09-30	66
8	2	4	2027-10-01	2027-12-31	66
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.roles (id, name) FROM stdin;
1	ROLE_ADMIN
2	ROLE_HIGHER_MANAGEMENT
3	ROLE_ENGINEERING_MANAGER
4	ROLE_PRODUCT_MANAGER
5	ROLE_TEAM_LEAD
6	ROLE_PRODUCT_OWNER
7	ROLE_USER
\.


--
-- Data for Name: team_capacity; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.team_capacity (id, team_id, year, quarter, effective_capacity) FROM stdin;
1	1	2026	2	10.29
\.


--
-- Data for Name: team_persons; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.team_persons (team_id, person_id) FROM stdin;
1	1
1	2
1	3
1	4
1	5
1	6
1	7
1	8
1	9
1	10
1	11
1	12
\.


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.teams (id, name, department, support_overhead, team_lead, allocation, duration, total_effort, risk) FROM stdin;
1	Platform	IT	20.00	John Doe	60%	Feb - Oct 2027	720 pts	HIGH
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.user_roles (user_id, role_id) FROM stdin;
7	7
8	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.users (id, username, email, password, enabled) FROM stdin;
7	alice@gmail.com	alice@gmail.com	$2a$10$uAJaYKeIUOJrwbuMHRJ92uSyQET9kxlBi/afd6J.KGxlA2oBWtU66	t
8	admin@gmail.com	admin@gmail.com	$2a$10$WTXGgXcPIYH1YW6IrkkhGOxd74b3aJQnUn44tFZWQXacoMDTNZgJ.	t
\.


--
-- Data for Name: years; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.years (id, year) FROM stdin;
1	2026
2	2027
\.


--
-- Name: epics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.epics_id_seq', 10, true);


--
-- Name: initiatives_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.initiatives_id_seq', 12, true);


--
-- Name: persons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.persons_id_seq', 15, true);


--
-- Name: quarters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.quarters_id_seq', 8, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.roles_id_seq', 7, true);


--
-- Name: team_capacity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.team_capacity_id_seq', 1, true);


--
-- Name: teams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.teams_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- Name: years_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.years_id_seq', 2, true);


--
-- Name: epic_teams epic_teams_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.epic_teams
    ADD CONSTRAINT epic_teams_pkey PRIMARY KEY (epic_id, team_id);


--
-- Name: epics epics_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.epics
    ADD CONSTRAINT epics_pkey PRIMARY KEY (id);


--
-- Name: initiatives initiatives_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.initiatives
    ADD CONSTRAINT initiatives_pkey PRIMARY KEY (id);


--
-- Name: persons persons_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.persons
    ADD CONSTRAINT persons_pkey PRIMARY KEY (id);


--
-- Name: quarters quarters_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.quarters
    ADD CONSTRAINT quarters_pkey PRIMARY KEY (id);


--
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: team_capacity team_capacity_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.team_capacity
    ADD CONSTRAINT team_capacity_pkey PRIMARY KEY (id);


--
-- Name: team_persons team_persons_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.team_persons
    ADD CONSTRAINT team_persons_pkey PRIMARY KEY (team_id, person_id);


--
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);


--
-- Name: team_capacity uk2yxirse7hqaihq5d9u2gr98q2; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.team_capacity
    ADD CONSTRAINT uk2yxirse7hqaihq5d9u2gr98q2 UNIQUE (team_id, year, quarter);


--
-- Name: quarters uks9k9vxcnuotf19sch89loxm7c; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.quarters
    ADD CONSTRAINT uks9k9vxcnuotf19sch89loxm7c UNIQUE (year_id, quarter_number);


--
-- Name: team_capacity uq_team_year_quarter; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.team_capacity
    ADD CONSTRAINT uq_team_year_quarter UNIQUE (team_id, year, quarter);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: years years_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.years
    ADD CONSTRAINT years_pkey PRIMARY KEY (id);


--
-- Name: years years_year_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.years
    ADD CONSTRAINT years_year_key UNIQUE (year);


--
-- Name: epic_teams fk_epic_teams_epic; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.epic_teams
    ADD CONSTRAINT fk_epic_teams_epic FOREIGN KEY (epic_id) REFERENCES public.epics(id) ON DELETE CASCADE;


--
-- Name: epic_teams fk_epic_teams_team; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.epic_teams
    ADD CONSTRAINT fk_epic_teams_team FOREIGN KEY (team_id) REFERENCES public.teams(id) ON DELETE CASCADE;


--
-- Name: epics fk_epics_initiative; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.epics
    ADD CONSTRAINT fk_epics_initiative FOREIGN KEY (initiative_id) REFERENCES public.initiatives(id) ON DELETE CASCADE;


--
-- Name: quarters fk_quarters_year; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.quarters
    ADD CONSTRAINT fk_quarters_year FOREIGN KEY (year_id) REFERENCES public.years(id) ON DELETE CASCADE;


--
-- Name: team_capacity fk_team_capacity_team; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.team_capacity
    ADD CONSTRAINT fk_team_capacity_team FOREIGN KEY (team_id) REFERENCES public.teams(id) ON DELETE CASCADE;


--
-- Name: team_persons fk_team_persons_person; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.team_persons
    ADD CONSTRAINT fk_team_persons_person FOREIGN KEY (person_id) REFERENCES public.persons(id) ON DELETE CASCADE;


--
-- Name: team_persons fk_team_persons_team; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.team_persons
    ADD CONSTRAINT fk_team_persons_team FOREIGN KEY (team_id) REFERENCES public.teams(id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

\unrestrict Vri5es9aotrC43NfMw7hQfhMc7SzGIQI2GQzNAe0kvqprYMeDjLCezVYhtqvagl

