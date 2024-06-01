import React, { useState, useEffect } from 'react';

const Consultants = () => {
    const [consultants, setConsultants] = useState({
        Other: [],
        Sports: [],
        Yoga: []
    });
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        const fetchConsultants = async () => {
            try {
                const res = await fetch("/user/consultants", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await res.json();

                const segregatedData = data.reduce((acc, consultant) => {
                    acc[consultant.consultationType] = acc[consultant.consultationType] || [];
                    acc[consultant.consultationType].push(consultant);
                    return acc;
                }, { Other: [], Sports: [], Yoga: [] });

                setConsultants(segregatedData);
            } catch (error) {
                console.error('Error fetching consultants:', error);
            }
        };

        fetchConsultants();
    }, []);

    const ConsultantCard = ({ consultant }) => (
        <div className="border p-2 rounded-lg shadow-lg bg-white transition transform hover:scale-105 hover:shadow-2xl">
            <h3 className="text-base font-semibold text-blue-600">{consultant.title} {consultant.name}</h3>
            <p className="text-sm text-gray-700"><strong>Location:</strong> {consultant.location}</p>
            <p className="text-sm text-gray-700"><strong>Phone:</strong> {consultant.phone}</p>
            <p className="text-sm text-gray-700"><strong>Languages:</strong> {consultant.lang}</p>
            <p className="text-sm text-gray-700"><strong>Years of Experience:</strong> {consultant.yoe}</p>
            <p className="text-sm text-gray-700"><strong>Consultation Type:</strong> {consultant.consultationType}</p>
        </div>
    );

    const toggleCategory = (category) => {
        setActiveCategory(activeCategory === category ? null : category);
    };

    return (
        <div className="container mx-auto p-4 h-screen overflow-y-auto">
            {['Other', 'Sports', 'Yoga'].map((type) => (
                <div key={type} className="mb-4">
                    <button 
                        onClick={() => toggleCategory(type)} 
                        className="w-full text-left text-lg font-bold mb-2 text-purple-700 bg-gray-200 p-2 rounded"
                    >
                        {type} Consultants
                    </button>
                    {activeCategory === type && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {consultants[type].map((consultant) => (
                                <ConsultantCard key={consultant._id} consultant={consultant} />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Consultants;
