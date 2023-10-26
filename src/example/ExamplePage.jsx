import React from 'react';
import { useState } from 'react';

import { useKeyedState } from '@edx/react-unit-test-utils';
import { Container, Card, Button, Form, useMediaQuery } from '@edx/paragon';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform/config';
// import { CourseCard } from './CourseCard.jsx';

const apis = {
  courses: 'courses/v1/courses/',
};

const useExamplePageData = () => {
  const get = (uri) => getAuthenticatedHttpClient()
    .get(`${getConfig().LMS_BASE_URL}/api/${uri}`);
  const [apiObjects, setAPIObjects] = useKeyedState('apiObjects', {});
  const logAPI = (key, uri) => {
    get(uri).then(({ data }) => {
      apiObjects[key] = data;
    });
  };
  React.useEffect(() => {
    Object.keys(apis).forEach(key => {
      get(apis[key]).then(({ data }) => {
        setAPIObjects((old) => ({ ...old, [key]: data }));
      });
    });
  }, []); // empty list means only on first load.
 
  return { courses: apiObjects.courses };
};


const CourseCard = ({ course }) => {
  // https://paragon-openedx.netlify.app/components/card/#card-variants
  let { name, id, short_description,  } = course; 
  const { uri , uri_absolute } = course.media.banner_image
  const bannerImgUrl = course.media.banner_image.uri_absolute;
  const courseImgUrl = course.media.course_image.uri;


  // const isExtraSmall = useMediaQuery({ maxWidth: breakpoints.extraSmall.maxWidth });
  const [cardVariant, setCardVariant] = useState('light');
  const isExtraSmall = true;

  function capitalizeWords(inputString) {
    // Split the string into an array of words
    const words = inputString.split(" ");
  
    // Capitalize the first letter of each word and join them back together
    const capitalizedWords = words.map(word => {
      if (word.length === 0) {
        return word; // Handle empty words
      }
      return word[0].toUpperCase() + word.slice(1);
    });
  
    // Join the capitalized words back into a single string
    const resultString = capitalizedWords.join(" ");
    return resultString;
  }

  name = capitalizeWords(name)

  return (
    <Card style={{ width: "18rem" }} className={"d-inline-block m-4"} >
        <Card.ImageCap src={bannerImgUrl} srcAlt=""/>
        <Card.Header title={name} />
        <Card.Section>
          {short_description} 
          {/* start date and end date */}
        </Card.Section>
        <Card.Footer textElement="Course">
          <Button
            variant="primary"
          >
            Enroll
          </Button>
        </Card.Footer>
    </Card>
  
  );
};

const ExamplePage = () => {
  const { courses } = useExamplePageData();
  // courses: [{ <course object> }];
  console.log("COURSES:", { courses });
  return (
    <main>
     <Container className="py-5">
        <h1>Courses</h1>
        {courses && courses.results.map((course) => (
          <CourseCard course={course} />
        ))}
      </Container>
    </main>
  );
};

export default ExamplePage;


  // const apis = {
  //   courses: 'courses/v1/courses/',
  //   mfe_context: 'mfe_context',
  // };
  
  // const { courses } = apis;
  
  // const courseAPIs = {
  //   // blocks: (course_id) => `courses/v2/blocks/?course_id=${course_id}`,
  //   instructorReports: (course_id) => `instructor/v1/reports/${course_id}`,
  //   instructorTaskScheduledBulkEmails: (course_id) =>
  //     `instructor_task/v1/schedules/${course_id}/bulk_email/`,
  // };
  
  // const ExamplePage = () => {
  //   const get = (uri) => getAuthenticatedHttpClient()
  //     .get(`${getConfig().LMS_BASE_URL}/api/${uri}`);
  //   const [apiObjects, setAPIObjects] = useKeyedState('apiObjects', {});
  //   const [courseAPIObjects, setCourseAPIObjects] = useKeyedState('courseAPIObjects', {});
  //   const logAPI = (key, uri) => {
  //     get(uri).then(({ data }) => {
  //       apiObjects[key] = data;
  //     });
  //   };
  //   React.useEffect(() => {
  //     Object.keys(apis).forEach(key => {
  //       get(apis[key]).then(({ data }) => {
  //         setAPIObjects((old) => ({ ...old, [key]: data }));
  //       });
  //     });
  //     get('courses/v1/courses/').then(({ data }) => {
  //       const { course_id } = data.results[0];
  //       Object.keys(courseAPIs).forEach(key => {
  //         get(courseAPIs[key](course_id)).then(({ data }) => {
  //           setCourseAPIObjects((old) => ({ ...old, [key]: data }));
  //         });
  //       });
  //     });
  //   }, []);
  
  //   return (
  //     <main>
  //       <Container className="py-5">
  //         <h1>Example Page</h1>
  //         <p>Hello world!</p>
  //         <br />
  //         <b>API Objects</b>
  //         {Object.keys(apiObjects).map((key) => (
  //           <pre>{JSON.stringify(apiObjects[key], null, 2)}</pre>
  //         ))}
  //         <br />
  //         <b>Course API Objects</b>
  //         {Object.keys(apiObjects).map((key) => (
  //           <pre>{JSON.stringify(apiObjects[key], null, 2)}</pre>
  //         ))}
  //       </Container>
  //     </main>
  //   );
  // };