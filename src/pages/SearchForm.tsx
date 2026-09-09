import { MagnifyingGlass } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionsContext } from '../contexts/TransactionsContext';
import styled from 'styled-components';
import { useContextSelector } from 'use-context-selector';

const SearchFormContainer = styled.form`
display: flex;
gap: 1rem;

input {
    flex: 1;
    border-radius: 4px;
    border: 0;
    background: ${props => props.theme["gray-900"]};
    color: ${props => props.theme["gray-300"]};
    padding: 1rem;

    &::placeholder {
        color: ${props => props.theme["gray-500"]};
    }
}

    button {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        
        border: 0;
        padding: 1rem;
        background: transparent;
        border: 1px solid ${props => props.theme["green-300"]};
        color: ${props => props.theme["green-300"]};
        font-weight: bold;
        border-radius: 6px;
        cursor: pointer;

        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        &:not(:disabled):hover {
             background: ${props => props.theme["green-500"]};
        border: 1px solid ${props => props.theme["green-500"]};
        color: ${props => props.theme.white};

        transition:
         background-color 0.2s, 
         color 0.2s,
         boder-color 0.2s;
        }
    }


`


const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

 export function SearchForm() {
  const  fetchTransactions  = useContextSelector(TransactionsContext, (context) => {
    return context.fetchTransactions
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: SearchFormInputs) {

    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input type="text" placeholder="Busque por transações" {...register('query')} />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}


