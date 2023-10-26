import React from 'react';
import { Card } from '@edx/paragon'


const CourseCard = ({ course }) => {
    // https://paragon-openedx.netlify.app/components/card/#card-variants
    const { name, id, short_description } = course; 
    const bannerImgUrl = course.media.banner_image.uri_absolute;
    return (
      <Card>
        <h2>{name}</h2>
      </Card>
    );
  };

// export default CourseCard;