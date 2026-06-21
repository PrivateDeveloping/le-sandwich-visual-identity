import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { usePlaceOrder, type PlacedOrder } from "@/hooks/usePlaceOrder";
import { ApiError, NetworkError } from "@/lib/api";

const STORAGE_KEY = "le_sandwich_customer";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  phone: z.string().trim().min(4, "Phone number is required").max(40),
  address: z.string().trim().min(4, "Delivery address is required").max(500),
  notes: z.string().trim().max(500).optional(),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CheckoutDialog({ open, onOpenChange }: Props) {
  const { cartItems, subtotal, clearCart, setCartOpen } = useCart();
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  const placeOrderMutation = usePlaceOrder();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", address: "", notes: "" },
  });

  // Hydrate from localStorage on open so returning customers don't retype
  useEffect(() => {
    if (!open) return;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const saved = JSON.parse(raw);
      form.reset({
        name: saved.name ?? "",
        phone: saved.phone ?? "",
        address: saved.address ?? "",
        notes: "",
      });
    } catch {
      // Corrupted storage - ignore
    }
  }, [open, form]);

  // Reset the success view whenever the dialog reopens
  useEffect(() => {
    if (open) setPlacedOrder(null);
  }, [open]);

  const onSubmit = async (values: FormValues) => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    try {
      const order = await placeOrderMutation.mutateAsync({
        customer: {
          name: values.name,
          phone: values.phone,
          address: values.address,
          notes: values.notes?.trim() || null,
        },
        items: cartItems.map((ci) => ({
          menuItemId: ci.item.id,
          quantity: ci.quantity,
        })),
      });

      // Save customer info for next time (no notes — those are order-specific)
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          name: values.name,
          phone: values.phone,
          address: values.address,
        }),
      );

      setPlacedOrder(order);
      clearCart();
      setCartOpen(false);
    } catch (err) {
      if (err instanceof NetworkError) {
        toast.error("Could not reach the kitchen. Please try again.");
      } else if (err instanceof ApiError) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const submitting = placeOrderMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border-border sm:max-w-md">
        {placedOrder ? (
          <SuccessView order={placedOrder} onClose={() => onOpenChange(false)} />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl font-black uppercase">
                Checkout
              </DialogTitle>
              <DialogDescription className="font-body">
                We'll call you to confirm. Payment on delivery.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" disabled={submitting} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+383 44 ..."
                          autoComplete="tel"
                          disabled={submitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Street, number, city"
                          autoComplete="street-address"
                          disabled={submitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Building, floor, allergies, etc."
                          disabled={submitting}
                          rows={2}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="font-display font-bold uppercase text-foreground">Total</span>
                  <span className="font-display text-xl font-black text-primary">
                    {subtotal.toFixed(2)}€
                  </span>
                </div>

                <p className="text-xs text-muted-foreground">
                  Your name, phone, and address are saved in your browser so you don't have to retype next time.
                </p>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-display font-bold uppercase"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Placing order...
                    </>
                  ) : (
                    `Place order — ${subtotal.toFixed(2)}€`
                  )}
                </Button>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function SuccessView({ order, onClose }: { order: PlacedOrder; onClose: () => void }) {
  return (
    <div className="text-center space-y-4 py-2">
      <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
        <Check className="h-7 w-7 text-primary" />
      </div>
      <div>
        <h2 className="font-display text-2xl font-black uppercase">Order received!</h2>
        <p className="font-body text-sm text-muted-foreground mt-1">
          Your order <span className="font-bold text-foreground">#{order.orderNumber}</span> is in.
        </p>
      </div>
      <div className="bg-muted/40 border border-border p-4 text-left space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total</span>
          <span className="font-bold">{(order.total / 100).toFixed(2)}€</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Delivering to</span>
          <span className="font-medium text-right max-w-[60%] truncate">{order.customerAddress}</span>
        </div>
      </div>
      <p className="font-body text-xs text-muted-foreground">
        We'll call you on <span className="font-bold text-foreground">{order.customerPhone}</span> to confirm.
        Payment on delivery.
      </p>
      <Button onClick={onClose} variant="outline" className="w-full">
        Done
      </Button>
    </div>
  );
}
