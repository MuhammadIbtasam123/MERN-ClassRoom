// import React from "react";

const TestimonialsGrid = () => {
  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      designation: "CEO",
      comment:
        "“When I make Class Companion assignments just for practice, there’s less cheating.”",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      designation: "Marketing Manager",
      comment:
        "“Last week, my students were doing an assignment on paper and they asked, why aren't we using Class Companion?”",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Michael Johnson",
      designation: "Sales Executive",
      comment:
        "“After the very first time my students used it, they were like, that was amazing… The kids who are using it are doing great. They’ve grown so much and are doing so much better on their unit exams and assignments.”",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 1,
      name: "John Doe",
      designation: "CEO",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      designation: "Marketing Manager",
      comment:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Michael Johnson",
      designation: "Sales Executive",
      comment:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];

  return (
    <>
      <h1
        className="
          text-4xl font-bold text-center text-gray-700 p-20"
        style={{
          fontFamily: "lobster, cursive",
        }}
      >
        Hear From Our Customers
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-10 pb-20">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-4 rounded-2xl border">
            <div className="flex items-center mb-4">
              <img
                className="w-12 h-12 rounded-full mr-4"
                src={testimonial.image}
                alt="User Image"
              />
              <div>
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                <p className="text-gray-600">{testimonial.designation}</p>
              </div>
            </div>
            <p className="text-gray-800">{testimonial.comment}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default TestimonialsGrid;
