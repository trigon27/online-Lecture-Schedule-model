import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import AdminInstructor from "./AdminInstructor";

function AdminContent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Button to open the dialog */}
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Open Admin Content
      </button>

      {/* The dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 bg-black opacity-30"></div>
          <div className="z-10 bg-white rounded-lg w-1/3 p-4">
            <div className="flex justify-end">
              <button
                className="focus:outline-none"
                onClick={() => setOpen(false)}
              >
                <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <h1 className="text-xl font-bold">Panel Title</h1>
              <AdminInstructor></AdminInstructor>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default AdminContent;
