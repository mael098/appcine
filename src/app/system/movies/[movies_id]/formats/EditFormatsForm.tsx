'use client';

import { Input, SubmitPrimaryInput } from "@/components/Input";
import { FormEventHandler, useState } from "react";

export interface EditFormatsAction {
    (props: FormData): Promise<{ status: 'error' | 'success', message: string }>;
}

export interface EditFormatsProps {
    action: EditFormatsAction;
    initialData: {
        format: number;
    };
}

export function EditFormatsForm({ action, initialData }: EditFormatsProps) {
    const [formData, setFormData] = useState({
        format: initialData.format.toString(),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("format", formData.format);

        const request = await action(formDataToSend);

        if (request.status === 'error') {
            alert(request.message);
        } else {
            alert('Format updated successfully!');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input
                name="format"
                type="text"
                placeholder="Formato"
                value={formData.format}
                onChange={handleChange}
                required
            />
            <SubmitPrimaryInput value="Actualizar Formato" />
        </form>
    );
}
