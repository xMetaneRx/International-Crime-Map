import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { Form } from "./Form";
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "../firebase";

interface Data {
    title: string;
    description: string;
    latitude: string;
    longitude: string;
}

export function EditCrime() {
    const [data, setData] = useState<Data>({
        title: "",
        description: "",
        latitude: "",
        longitude: "",
    });
    const params = useParams();
    const id = params.crimeId;

    useEffect(() => {
        async function getCrime() {
            try {
                const response = await getDoc(doc(db, "crimes", `${id}`));
                if (response.exists()) {
                    setData(response.data() as Data);
                }
            } catch (err) {
                console.log(err);
            }
        }

        getCrime();
    }, [id]);

    return (
        <Grid container direction="column" style={{ textAlign: "center" }}>
            <h2>Edit crime</h2>
            <Form data={data} />
        </Grid>
    );
}
