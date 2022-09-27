import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
    <ContentLoader
        speed={2}
        width={540}
        height={350}
        viewBox="0 0 540 350"
        backgroundColor="#dfd3d3"
        foregroundColor="#c4b5b5"
        {...props}
    >
        <rect x="0" y="10" rx="16" ry="16" width="540" height="32" />
        <circle cx="45" cy="145" r="45" />
        <circle cx="195" cy="145" r="45" />
        <circle cx="345" cy="145" r="45" />
        <circle cx="495" cy="145" r="45" />
        <rect x="175" y="280" rx="12" ry="12" width="180" height="20" />
    </ContentLoader>
)

export default Skeleton;