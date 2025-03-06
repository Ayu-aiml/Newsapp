import React from "react";

function Card(props) {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
      {/* Image Section */}
      {props.imgUrl && (
        <div className="relative">
          <img className="w-full h-64 object-cover" src={props.imgUrl} alt="News" />
          <div className="absolute bottom-0 bg-black bg-opacity-50 text-white text-sm px-3 py-1">
            {props.source}
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
          {props.title}
        </h2>

        {/* Description */}
        <p className="mt-3 text-gray-700 text-sm leading-relaxed">
          {props.description?.substring(0, 200)}...
        </p>

        {/* Info Section */}
        <div className="mt-4 text-sm text-gray-500 flex flex-wrap gap-3">
          {props.author && (
            <p>
              <span className="font-medium text-gray-800">Author:</span> {props.author}
            </p>
          )}
          {props.publishedAt && (
            <p>
              <span className="font-medium text-gray-800">Published:</span> {new Date(props.publishedAt).toDateString()}
            </p>
          )}
        </div>

        {/* Read More Button */}
        {props.url && (
          <div className="mt-5">
            <a
              href={props.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Read More
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
