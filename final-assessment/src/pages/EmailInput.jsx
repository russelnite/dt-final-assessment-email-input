import { useEffect, useState } from "react";
import { getEmails } from "../services/email.service";

function EmailInput() {
  const [emails, setEmails] = useState([]);
  const [input, setInput] = useState("");
  const [matchedEmails, setMatchedEmails] = useState([]);
  const [addedEmails, setAddedEmails] = useState([]);

  useEffect(() => {
    getEmails().then((data) => {
      setEmails(data);
    });
  }, []);

  useEffect(() => {
    const matched = emails.filter(
      (email) => input && email.split("@")[0].startsWith(input)
    );
    setMatchedEmails(matched);
  }, [input, emails]);

  const handleOnChange = (e) => setInput(e.target.value);

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Tab") {
      setAddedEmails((prev) => [...prev, input]);
      setInput("");
      setMatchedEmails([]);
    }
  };

  return (
    <>
      <section className="w-screen">
        <div className="flex flex-grow bg-white m-auto w-[26%] p-1 pl-3 rounded-lg tracking-tighter">
          {addedEmails.map((email, index) => (
            <span
              key={index}
              className="w-auto h-6 px-1 flex mt-2 mr-2 items-center justify-center hover:bg-neutral-200 rounded-md"
            >
              {email}
            </span>
          ))}
          <input
            type="email"
            placeholder="Enter recipients..."
            value={input}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            className="w-full flex flex-grow placeholder-neutral-500 text-lg text-gray-400 focus:outline-0 h-10"
          />
          {matchedEmails.length > 0 && (
            <ul className="absolute top-107 -ml-3 rounded-md bg-white drop-shadow-xl w-[18%] py-4 max-h-48 overflow-y-auto custom-scrollbar">
              {matchedEmails.map((email, index) => (
                <li
                  key={index}
                  className="px-4 py-4 hover:bg-blue-50 cursor-pointer"
                  onClick={() => {
                    setAddedEmails((prev) => [...prev, email]);
                    setInput("");
                    setMatchedEmails([]);
                  }}
                >
                  {email}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

export default EmailInput;
