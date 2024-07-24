import { useForm } from "react-hook-form";
import { specificApis } from "../data/SpecificApis";

const AddReferral = ({ onClose, data }) => {
    const { register, control, watch, handleSubmit, reset } = useForm({
        defaultValues: data ?? {}
    });
    async function onSubmit(submitData) {
        try {
            await specificApis.addReferralSources(submitData);
            toast.success('Referral Added successfully')
            onClose()
        } catch (error) {
            console.error('Error updating test:', error);
            toast.error('Error  Addeding Referral')
        }
    }
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center overflow-auto justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-6/12">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Add Referral Source</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="mb-3">
                            <label className="block  text-sm font-bold mb-2">Name</label>
                            <input
                                type="text" name="name" placeholder="Template Code" {...register(`name`)} required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label className="block  text-sm font-bold mb-2">Code</label>
                            <input
                                type="text" name="code" placeholder="header" {...register(`code`)} required
                                className="shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label className="block  text-sm font-bold mb-2">Currency</label>
                            <input
                                type="text" name="code" placeholder="header" {...register(`currency`)} required
                                className="shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="mb-3">
                            <label className="block  text-sm font-bold mb-2">phone1</label>
                            <input
                                type="number" name="name" placeholder="Template Code" {...register(`phone1`)} required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label className="block  text-sm font-bold mb-2">phone2</label>
                            <input
                                type="number" name="code" placeholder="header" {...register(`phone2`)} required
                                className="shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label className="block  text-sm font-bold mb-2">Complement</label>
                            <input
                                type="number" name="code" placeholder="header" {...register(`complement`)} required
                                className="shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="mb-3">
                            <label className="block  text-sm font-bold mb-2">designation</label>
                            <input
                                type="tel" name="name" placeholder="Designation" {...register(`designation`)} required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label className="block  text-sm font-bold mb-2">specialisation</label>
                            <input
                                type="tel" name="code" placeholder="header" {...register(`specialisation`)}
                                className="shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label className="block  text-sm font-bold mb-2">Discount</label>
                            <input
                                type="number" name="code" placeholder="discount" {...register(`discount`)} required
                                className="shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="mb-3">
                            <label className="block  text-sm font-bold mb-2">refferal Source Type</label>
                            <input
                                type="tel" name="name" placeholder="refferalSourceType" {...register(`refferalSourceType`)} required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label className="block  text-sm font-bold mb-2">gender</label>
                            <select
                                {...register(`gender`)} required
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border">\
                                <option value={"OTHER"}>Other</option>
                                <option value={"ANY"}>Any</option>
                                <option value={"MALE"}>Male</option>
                                <option value={"FEMALE"}>Female</option>
                            </select>
                        </div>
                        <div>
                            <label className="block  text-sm font-bold mb-2">email</label>
                            <input
                                type="email" name="code" placeholder="header" {...register(`email`)} required
                                className="shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <div >
                            <label className="block  text-sm font-bold mb-2">addressLine1</label>
                            <textarea  {...register(`addressLine1`)} required className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                        </div>
                        <div>
                            <label className="block  text-sm font-bold mb-2">addressLine2</label>
                            <textarea  {...register(`addressLine2`)} required className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                        </div>
                        <div>
                            <label className="block  text-sm font-bold mb-2">addressLine3</label>
                            <textarea  {...register(`addressLine3`)} required className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                        </div>
                    </div>
                    <div className="flex justify-end items-center mt-4 gap-3">
                        <button type="button" onClick={onClose} className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
                        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save Template</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddReferral