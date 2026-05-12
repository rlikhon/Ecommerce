import axios from "axios";
import client from "../api/client";

export const showSizeService = () => client.get(`/sizes`);
