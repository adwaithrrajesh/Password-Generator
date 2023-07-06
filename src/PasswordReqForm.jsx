import React from 'react'
import { useState } from 'react'
import { toast, ToastContainer, useToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PasswordReqForm() {

    const [userInp, setUserInp] = useState('')
    const [passwordLength, setPasswordLength] = useState(8);
    const [uppercase, setUppercase] = useState(false);
    const [lowercase, setLowercase] = useState(false);
    const [numbers, setNumbers] = useState(false);
    const [specialCharacters, setSpecialCharacters] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState()
    const [password,setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 3000);
        //   Validating Password Input
        if(!userInp && !uppercase && !lowercase && !numbers && ! specialCharacters){
            toast.error("Please Select your Password Requirements")
        }else{

            if (passwordLength < 5) {
                setIsLoading(false)
                toast.error("Password Length must contain At Least 5 characters")
            } else if (passwordLength > 14) {
                setIsLoading(false)
                toast.error("Password Length Can't be upto 14")
            } else if (!passwordLength) {
                setIsLoading(false)
                toast.error("Please Enter the Length of the password")
            } else {
    
                // -------------  Implementing Logic  --------------------
                const upperCase_Characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                const lowerCase_Characters = 'abcdefghijklmnopqrstuvwxyz'
                const Randomnumbers = '1234567890'
                const specialCharactersRandom = '!@#$%&*-_+=:;,.?()~'
                let storePassword = ''
    
                // CHECKING AND SETTING RANDOM Character
                while (storePassword.length < passwordLength) {
                    if (uppercase) {
                        storePassword += upperCase_Characters.charAt(Math.floor(Math.random() * upperCase_Characters.length))
                    } if (lowercase) {
                        storePassword += lowerCase_Characters.charAt(Math.floor(Math.random() * lowerCase_Characters.length))
                    } if (numbers) {
                        const randomIndex = Math.floor(Math.random() * Randomnumbers.length);
                        storePassword += Randomnumbers[randomIndex]
                    } if (specialCharacters) {
                        const randomIndex = Math.floor(Math.random() * specialCharactersRandom.length);
                        storePassword += specialCharactersRandom[randomIndex];
                    } if (userInp) {
                        const filteredInp = userInp.replace(/\s+/g, '');
                        const randomIndex = Math.floor(Math.random() * filteredInp.length)
                        storePassword += filteredInp[randomIndex]
                    }
                }
                setIsLoading(false)
                setPassword(storePassword)
            }


        }


    };


    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
    
    }

    return (
        <>
            <div className="bg-gray-900 p-8 w-full  lg:w-1/2 rounded shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-90">

                <h2 className="text-2xl font-bold mb-8 text-green-400 text-center ">Generate Password</h2>

                {
                    password &&
                <div className="mb-4">
                    <label
                        htmlFor="passwordLength"
                        className="block text-gray-100 font-semibold mb-2"
                    >
                        
                    </label>
                    <input
                        value={password}
                        readOnly
                        className="w-3/4 p-3 rounded mb-4 bg-gray-700 text-gray-100 focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <button className="bg-green-500 w-1/6 text-gray-100 px-4 py-3 ml-4 rounded font-semibold hover:bg-green-600 transition-colors duration-300"
                        onClick={handleCopy}
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                }


                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label
                            htmlFor="passwordLength"
                            className="block text-gray-100 font-semibold mb-2"
                        >
                            Password Length
                        </label>
                        <input
                            type="number"
                            id="passwordLength"
                            min={0}
                            className="w-full p-3 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring focus:border-blue-500"
                            value={passwordLength}
                            onChange={(e) => setPasswordLength(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="passwordLength"
                            className="block text-gray-100 font-semibold mb-2"
                        >
                            <div className="flex">
                                Must Include Characters (optional)
                            </div>
                        </label>
                        <input
                            id="passwordLength"
                            className="w-full p-3 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring focus:border-blue-500"
                            value={userInp}
                            onChange={(e) => setUserInp(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-100 font-semibold mb-2">Password Requirements:</p>
                        <label className="flex items-center text-gray-100">
                            <input
                                type="checkbox"
                                className="form-checkbox text-blue-500 transform transition-transform duration-500 hover:scale-110"
                                checked={uppercase}
                                onChange={(e) => setUppercase(e.target.checked)}
                            />
                            <span className="ml-2">Uppercase Letters</span>
                        </label>
                        <label className="flex items-center text-gray-100">
                            <input
                                type="checkbox"
                                className="form-checkbox text-blue-500 transform transition-transform duration-300 hover:scale-110"
                                checked={lowercase}
                                onChange={(e) => setLowercase(e.target.checked)}
                            />
                            <span className="ml-2">Lowercase Letters</span>
                        </label>
                        <label className="flex items-center text-gray-100">
                            <input
                                type="checkbox"
                                className="form-checkbox text-blue-500 transform transition-transform duration-300 hover:scale-110"
                                checked={numbers}
                                onChange={(e) => setNumbers(e.target.checked)}
                            />
                            <span className="ml-2">Numbers</span>
                        </label>
                        <label className="flex items-center text-gray-100">
                            <input
                                type="checkbox"
                                className="form-checkbox text-blue-500 transform transition-transform duration-300 hover:scale-110"
                                checked={specialCharacters}
                                onChange={(e) => setSpecialCharacters(e.target.checked)}
                            />
                            <span className="ml-2">Special Characters</span>
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="bg-green-700 text-gray-100 px-4 py-3 rounded font-semibold w-full hover:bg-green-800 transition-colors duration-300"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-4 h-4 rounded-full bg-green-300 animate-bounce" />
                                <span className="ml-2">Generating password..</span>
                            </div>
                        ) : (
                            'Generate Password'
                        )}
                    </button>
                </form>

            </div>
            <ToastContainer />
        </>
    )
}
