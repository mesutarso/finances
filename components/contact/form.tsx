"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function ContactForm() {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        sujet: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)


        try {

            await new Promise((resolve) => setTimeout(resolve, 1500))


            setDialogOpen(true)


            timerRef.current = setTimeout(() => {
                setDialogOpen(false)
            }, 5000)

            setFormData({
                nom: "",
                prenom: "",
                email: "",
                telephone: "",
                sujet: "",
                message: "",
            })
        } catch (error) {

            alert("Une erreur est survenue. Veuillez réessayer plus tard.")
        } finally {
            setIsSubmitting(false)
        }
    }


    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
        }
    }, [])

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-50 rounded-tr-full -z-10"></div>

            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Formulaire de contact</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <Label htmlFor="nom" className="text-gray-700">
                            Nom
                        </Label>
                        <Input
                            id="nom"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            placeholder="Votre nom"
                            className="border-gray-200 focus:border-primary focus:ring-primary"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="prenom" className="text-gray-700">
                            Prénom
                        </Label>
                        <Input
                            id="prenom"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            placeholder="Votre prénom"
                            className="border-gray-200 focus:border-primary focus:ring-primary"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="votre.email@exemple.com"
                            className="border-gray-200 focus:border-primary focus:ring-primary"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="telephone" className="text-gray-700">
                            Téléphone
                        </Label>
                        <Input
                            id="telephone"
                            name="telephone"
                            type="tel"
                            value={formData.telephone}
                            onChange={handleChange}
                            placeholder="Votre numéro de téléphone"
                            className="border-gray-200 focus:border-primary focus:ring-primary"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="sujet" className="text-gray-700">
                        Sujet
                    </Label>
                    <Input
                        id="sujet"
                        name="sujet"
                        value={formData.sujet}
                        onChange={handleChange}
                        placeholder="Sujet de votre message"
                        className="border-gray-200 focus:border-primary focus:ring-primary"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700">
                        Message
                    </Label>
                    <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Votre message..."
                        className="min-h-[150px] border-gray-200 focus:border-primary focus:ring-primary"
                        required
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/80 text-white py-2.5"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center">
                            <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Envoi en cours...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center">
                            Envoyer le message
                            <Send className="ml-2 h-4 w-4" />
                        </span>
                    )}
                </Button>
            </form>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle className="flex items-center text-primary">
                            <CheckCircle className="h-6 w-6 mr-2" />
                            Message envoyé
                        </DialogTitle>
                        <DialogDescription>Nous vous répondrons dans les plus brefs délais.</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
