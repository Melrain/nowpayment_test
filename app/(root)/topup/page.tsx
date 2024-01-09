'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import React from 'react';

import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createInvoice } from '@/lib/actions/payment.actions';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  amount: z.coerce.number().positive()
});

const page = () => {
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0
    }
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await createInvoice({
        price_amount: values.amount,
        price_currency: 'usd',
        order_id: '1234',
        order_description: '测试订单',
        ipn_callback_url: 'https://example.com/ipn',
        success_url: '/topup/topup-success',
        cancel_url: '/topup/topup-cancel'
      });
      if (!result) {
        return <div>订单出现问题</div>;
      }
      router.push(result.invoice_url);

      console.log(result);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <h1>充值页面</h1>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <Input
                  type="number"
                  placeholder="请输入充值金额"
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">确认充值</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default page;
