export default function Card({user}) {
    return (
        <>
        <div className="border bg-white border-gray-200 rounded-xl hover:shadow-xl hover:transform hover:scale-110 p-2 flex flex-col items-center text-center" >
			<div className="max-h-full w-auto">
				<img  className="bg-white rounded-lg" src={user.picture.medium} alt="" />
			</div>
			<div className="text-sm mt-4">
				<div>
					{user.name.first}
				</div>
				<div className="mt-2">
					{user.email}
				</div>
			</div>
			

		</div>
        </>
    )
}