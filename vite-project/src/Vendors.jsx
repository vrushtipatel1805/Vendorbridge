import { useState } from "react";
import axios from "axios";

function Vendors() {

    const [form, setForm] = useState({
        companyName: "",
        vendorName: "",
        email: "",
        phone: "",
        address: "",
        gstNumber: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:5000/vendors",
                form
            );

            setMessage(response.data.message);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Vendor creation failed"
            );

        }

    };

    return (

        <div className="vendor-page">
            <form onSubmit={handleSubmit}>

            <h1>Add Vendor</h1>
               Company Name : <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    onChange={handleChange}
                />

                Vendor Name : <input
                    type="text"
                    name="vendorName"
                    placeholder="Vendor Name"
                    onChange={handleChange}
                />

                Email : <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                Phone : <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                />

                Address : <textarea
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                />

                GST Number : <input
                    type="text"
                    name="gstNumber"
                    placeholder="GST Number"
                    onChange={handleChange}
                />

                <button type="submit">
                    Add Vendor
                </button>

        <p>{message}</p>
            </form>

        </div>

    );

}

export default Vendors;