import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

type SelectMenusProps = {
  items: SelectMenuItemProps[];
  setCurItem: React.Dispatch<React.SetStateAction<SelectMenuItemProps>>;
};

export interface SelectMenuItemProps {
  id: number;
  content: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const SelectMenuItem = ({ content }: SelectMenuItemProps) => {
  return (
    <Listbox.Option
      className={({ active }) =>
        classNames(
          active ? 'bg-indigo-500 text-white' : 'text-gray-900',
          'relative cursor-default select-none py-2 pl-3 pr-9'
        )
      }
      value={content}
    >
      {({ selected, active }) => (
        <>
          <div className="flex items-center">
            <span
              className={classNames(
                selected ? 'font-semibold' : 'font-normal',
                'block truncate'
              )}
            >
              {content}
            </span>
          </div>

          {selected ? (
            <span
              className={classNames(
                active ? 'text-white' : 'text-indigo-600',
                'absolute inset-y-0 right-0 flex items-center pr-4'
              )}
            >
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  );
};

const SelectMenus = ({ items, setCurItem }: SelectMenusProps) => {
  const [selected, setSelected] = useState(items[0]);

  return (
    <Listbox
      value={selected}
      onChange={(e) => {
        setCurItem(e);
        setSelected(e);
      }}
    >
      {({ open }) => (
        <>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="flex items-center">
                <span className="block truncate">{selected.content}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {items.map((item) => (
                  <SelectMenuItem {...item} key={item.id} />
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default SelectMenus;
