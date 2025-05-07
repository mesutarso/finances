"use client"

import type React from "react"
import { sendMessageContact } from "@/actions/contact"
import { useState, useEffect, useRef, useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"




function errorMessage(error: any, name: string, message: string) {
    return error.find((err: any) => err.path === name) && message
}

export default function ContactForm() {
    const [state, formAction, isPending] = useActionState(sendMessageContact, undefined)

    const [dialogOpen, setDialogOpen] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)



    useEffect(() => {
        if (state?.success) {
            setDialogOpen(true)

            timerRef.current = setTimeout(() => {
                setDialogOpen(false)
            }, 5000)
        }
    }, [state])

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
            <form action={formAction} className="space-y-5">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <Label htmlFor="nom" className="text-gray-700 text-lg">
                            Nom
                        </Label>
                        <Input
                            id="nom"
                            name="nom"
                            placeholder="Votre nom"
                            className="border-gray-200 focus:border-primary focus:ring-primary"

                        />
                        {state?.error && (
                            <p className="text-red-500 text-sm">{state.error.nom}</p>
                        )}

                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="prenom" className="text-gray-700 text-lg">
                            Prénom
                        </Label>
                        <Input
                            id="prenom"
                            name="prenom"
                            placeholder="Votre prénom"
                            className="border-gray-200 focus:border-primary focus:ring-primary"

                        />
                        {state?.error && (
                            <p className="text-red-500 text-sm">{state.error.prenom}</p>
                        )}

                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 text-lg">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"

                            placeholder="votre.email@exemple.com"
                            className="border-gray-200 focus:border-primary focus:ring-primary"

                        />
                        {state?.error && (
                            <p className="text-red-500 text-sm">{state.error.email}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="telephone" className="text-gray-700 text-lg">
                            Téléphone
                        </Label>
                        <Input
                            id="telephone"
                            name="telephone"
                            type="tel"

                            placeholder="Votre numéro de téléphone"
                            className="border-gray-200 focus:border-primary focus:ring-primary"

                        />
                        {state?.error && (
                            <p className="text-red-500 text-sm">{state.error.telephone}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="sujet" className="text-gray-700 text-lg">
                        Sujet
                    </Label>
                    <Input
                        id="sujet"
                        name="sujet"

                        placeholder="Sujet de votre message"
                        className="border-gray-200 focus:border-primary focus:ring-primary"

                    />
                    {state?.error && (
                        <p className="text-red-500 text-sm">{state.error.sujet}</p>
                    )}

                </div>

                <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700 text-lg">
                        Message
                    </Label>
                    <Textarea
                        id="message"
                        name="message"

                        placeholder="Votre message..."
                        className="min-h-[150px] border-gray-200 focus:border-primary focus:ring-primary text-lg"

                    />
                    {state?.error && (
                        <p className="text-red-500 text-sm">{state.error.message}</p>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/80 text-white py-2.5"
                >
                    <span className="flex items-center justify-center">
                        {isPending ? "Envoi en cours..." : "Envoyer le message"}
                        <Send className="ml-2 h-4 w-4" />
                    </span>
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
