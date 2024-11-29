import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Layout from "./Layout";

import Components from "./component/index";
const {
  HomeComponent,
  WardComponent,
  ServiceQueueComponent,
  LoginComponent,
  PatientListComponent,
  LaboratoryComponent,
  AppointmentComponent,
} = Components;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/Login" element={<LoginComponent />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />

        <Route path="home" element={<HomeComponent />} />

        <Route path="/home/ward" element={<WardComponent />} />
        <Route path="/home/paitentlist" element={<PatientListComponent />} />

        <Route path="/home/servicequeue" element={<ServiceQueueComponent />} />
        <Route path="/home/laboratory" element={<LaboratoryComponent />} />
        <Route path="/home/appointment" element={<AppointmentComponent />} />
      </Route>
      
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
