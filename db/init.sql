--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.3 (Debian 16.3-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: Articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Articles" (
    id integer NOT NULL,
    title character varying(255),
    text text NOT NULL,
    "creationDate" timestamp with time zone NOT NULL,
    tag1 character varying(255) NOT NULL,
    tag2 character varying(255),
    tag3 character varying(255),
    img character varying(255),
    "categoryId" integer NOT NULL,
    "userId" integer NOT NULL,
    "userName" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Articles" OWNER TO postgres;

--
-- Name: Articles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Articles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Articles_id_seq" OWNER TO postgres;

--
-- Name: Articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Articles_id_seq" OWNED BY public."Articles".id;


--
-- Name: Categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Categories" (
    id integer NOT NULL,
    title character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Categories" OWNER TO postgres;

--
-- Name: Categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Categories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Categories_id_seq" OWNER TO postgres;

--
-- Name: Categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Categories_id_seq" OWNED BY public."Categories".id;


--
-- Name: Music; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Music" (
    id integer NOT NULL,
    song character varying(255) NOT NULL,
    album character varying(255) NOT NULL,
    lyrics text NOT NULL,
    category character varying(255) NOT NULL,
    img character varying(255),
    "releaseDate" timestamp with time zone NOT NULL,
    "userName" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Music" OWNER TO postgres;

--
-- Name: Music_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Music_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Music_id_seq" OWNER TO postgres;

--
-- Name: Music_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Music_id_seq" OWNED BY public."Music".id;


--
-- Name: Quotes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Quotes" (
    id integer NOT NULL,
    content integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Quotes" OWNER TO postgres;

--
-- Name: Quotes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Quotes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Quotes_id_seq" OWNER TO postgres;

--
-- Name: Quotes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Quotes_id_seq" OWNED BY public."Quotes".id;


--
-- Name: ToDoLists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ToDoLists" (
    id integer NOT NULL,
    text text NOT NULL,
    checked boolean NOT NULL,
    "creationDate" timestamp with time zone NOT NULL,
    "userName" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ToDoLists" OWNER TO postgres;

--
-- Name: ToDoLists_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ToDoLists_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ToDoLists_id_seq" OWNER TO postgres;

--
-- Name: ToDoLists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ToDoLists_id_seq" OWNED BY public."ToDoLists".id;


--
-- Name: Tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tokens" (
    id integer NOT NULL,
    "accessToken" character varying(255),
    "refreshToken" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer
);


ALTER TABLE public."Tokens" OWNER TO postgres;

--
-- Name: Tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Tokens_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Tokens_id_seq" OWNER TO postgres;

--
-- Name: Tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Tokens_id_seq" OWNED BY public."Tokens".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    "nickName" character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) DEFAULT 'user'::character varying NOT NULL,
    "isActivated" boolean DEFAULT false NOT NULL,
    "activationLink" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: Articles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Articles" ALTER COLUMN id SET DEFAULT nextval('public."Articles_id_seq"'::regclass);


--
-- Name: Categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories" ALTER COLUMN id SET DEFAULT nextval('public."Categories_id_seq"'::regclass);


--
-- Name: Music id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Music" ALTER COLUMN id SET DEFAULT nextval('public."Music_id_seq"'::regclass);


--
-- Name: Quotes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Quotes" ALTER COLUMN id SET DEFAULT nextval('public."Quotes_id_seq"'::regclass);


--
-- Name: ToDoLists id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ToDoLists" ALTER COLUMN id SET DEFAULT nextval('public."ToDoLists_id_seq"'::regclass);


--
-- Name: Tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tokens" ALTER COLUMN id SET DEFAULT nextval('public."Tokens_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: Articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Articles" (id, title, text, "creationDate", tag1, tag2, tag3, img, "categoryId", "userId", "userName", "createdAt", "updatedAt") FROM stdin;
4	rtg	rtgrtgrtggbrtbtb	2024-06-10 21:00:00+00	rtg	rtg	rtgrtg	\N	1	1	Antonio	2024-06-11 12:57:26.611+00	2024-06-11 13:07:01.271+00
\.


--
-- Data for Name: Categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Categories" (id, title, "createdAt", "updatedAt") FROM stdin;
1	Some	2024-01-01 00:00:00+00	2024-01-01 00:00:00+00
\.


--
-- Data for Name: Music; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Music" (id, song, album, lyrics, category, img, "releaseDate", "userName", "createdAt", "updatedAt") FROM stdin;
1	qqq	qqq	qqq	eee	\N	2020-01-01 00:00:00+00	Antonio	2020-01-01 00:00:00+00	2020-01-01 00:00:00+00
\.


--
-- Data for Name: Quotes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Quotes" (id, content, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: ToDoLists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ToDoLists" (id, text, checked, "creationDate", "userName", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tokens" (id, "accessToken", "refreshToken", "createdAt", "updatedAt", "UserId") FROM stdin;
1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJiYXJzYWZhbjk2QGdtYWlsLmNvbSIsImlzQWN0aXZhdGVkIjpmYWxzZSwiaWF0IjoxNzE4MTExNDk3LCJleHAiOjE3MTgxMTE1Mjd9.KspoQPLjcH2i95aY2nGTc9mzFCC_kEmmkC8i-hZLnkE	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJiYXJzYWZhbjk2QGdtYWlsLmNvbSIsImlzQWN0aXZhdGVkIjpmYWxzZSwiaWF0IjoxNzE4MTExNDk3LCJleHAiOjE3MTgxOTc4OTd9.0kLErCOz5uZ-tcviXqvjKNMdZ_4ej6BViduHmCr48qE	2024-06-11 12:37:31.831+00	2024-06-11 13:11:37.745+00	1
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, "nickName", email, password, role, "isActivated", "activationLink", "createdAt", "updatedAt") FROM stdin;
1	Antonio	barsafan96@gmail.com	$2b$04$wqo8qUkgiMQ0FSJ7dvMcFeKogNd9O0SfV3zIwK2OVMTGGPYSeHa1y	admin	f	fd9942fc-dfd1-43da-a76c-626a1ebf8132	2024-06-11 12:37:31.818+00	2024-06-11 12:37:31.818+00
\.


--
-- Name: Articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Articles_id_seq"', 4, true);


--
-- Name: Categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Categories_id_seq"', 1, false);


--
-- Name: Music_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Music_id_seq"', 1, true);


--
-- Name: Quotes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Quotes_id_seq"', 1, false);


--
-- Name: ToDoLists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ToDoLists_id_seq"', 1, true);


--
-- Name: Tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Tokens_id_seq"', 1, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 1, true);


--
-- Name: Articles Articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Articles"
    ADD CONSTRAINT "Articles_pkey" PRIMARY KEY (id);


--
-- Name: Categories Categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_pkey" PRIMARY KEY (id);


--
-- Name: Music Music_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Music"
    ADD CONSTRAINT "Music_pkey" PRIMARY KEY (id);


--
-- Name: Quotes Quotes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Quotes"
    ADD CONSTRAINT "Quotes_pkey" PRIMARY KEY (id);


--
-- Name: ToDoLists ToDoLists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ToDoLists"
    ADD CONSTRAINT "ToDoLists_pkey" PRIMARY KEY (id);


--
-- Name: Tokens Tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tokens"
    ADD CONSTRAINT "Tokens_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Tokens Tokens_UserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tokens"
    ADD CONSTRAINT "Tokens_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

