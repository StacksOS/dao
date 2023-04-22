import React from 'react';
import { truncateAddress } from '@stacks-os/utils';
import Avatar from 'boring-avatars';
import { CheckCheck, DollarSign } from 'lucide-react';

import { useProposalListContext } from '../hooks/useProposalListContext';
import { cn, getPercentage } from '../utils';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface ProposalItemProps extends React.HTMLAttributes<HTMLDivElement> {
  identifier: string;
  title: string;
  description: string;
  proposedBy: string;
  status?: string;
}

export function ProposalItem({
  identifier,
  title,
  description,
  proposedBy,
  status,
  ...props
}: ProposalItemProps) {
  const { view } = useProposalListContext();
  const isGridView = view === 'grid';
  const signalsReceived = 1;
  const signalsRequired = 3;
  return (
    <div
      className={cn(
        'divide-y divide-muted-foreground',
        status === 'active' && 'font-bold',
        isGridView && 'grid grid-cols-[25px_1fr] items-start pb-4'
      )}
      {...props}
    >
      {isGridView ? (
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$45,231.89</div>
            <p className='text-xs text-muted-foreground'>
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className='hover:cursor-pointe flex flex-row items-center justify-between border-b border-neutral-900 py-6'>
          <div className='flex flex-row items-center space-x-4'>
            <p className='text-gray font-regular text-md'>
              {identifier.toString().padStart(3, '0')}
            </p>
            <p className='text-light-900 text-md font-semibold'>{title}</p>
            <div className='flex flex-row items-center space-x-2'>
              <Avatar
                size={15}
                name={proposedBy}
                variant='beam'
                colors={['#624AF2', '#7301fa', '#eb00ff', '#27cb9f']}
              />
              <p className='text-gray font-regular text-sm'>
                {truncateAddress(proposedBy)}
              </p>
            </div>
          </div>
          <div className='flex flex-row items-center space-x-6'>
            <div className='flex flex-row items-center space-x-2'>
              <p>
                {signalsReceived}/{signalsRequired}
              </p>
              <div className='w-24'>
                <div className='bg-dark-500 h-2 rounded-lg'>
                  <div className='flex space-x-2'>
                    <div
                      className='h-3 rounded-md border border-green-500 bg-green-500'
                      style={{ width: `${(4 / 20) * 100}%` }}
                    />
                    <div
                      className='h-3 rounded-md border border-orange-500 bg-orange-500'
                      style={{ width: `${(10 / 20) * 100}%` }}
                    />
                    <div
                      className='h-3 rounded-md border border-gray-200 bg-gray-200'
                      style={{ width: `${(6 / 20) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant='link'
              size='sm'
              className={cn(
                'border-bg-gray-50/90 shadow-bg-gray-50 rounded-full border shadow-sm hover:no-underline'
              )}
            >
              {status === 'pending' && (
                <div className='flex flex-row items-center space-x-2'>
                  <div className='h-2 w-2 rounded-full bg-orange-500'></div>
                  <p className={cn('text-light-500')}>Pending</p>
                </div>
              )}
              {status === 'active' && (
                <div className='flex flex-row items-center space-x-2'>
                  <div className='h-2 w-2 rounded-full bg-green-500'></div>
                  <p className={cn('text-light-500')}>Active</p>
                </div>
              )}
              {status === 'executed' && (
                <div className='flex flex-row items-center space-x-2'>
                  <CheckCheck className='h-3 w-3 text-blue-500' />
                  <p
                    className={cn(
                      'text-light-500',
                      status === 'executed' && 'font-medium text-blue-500'
                    )}
                  >
                    Executed
                  </p>
                </div>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
