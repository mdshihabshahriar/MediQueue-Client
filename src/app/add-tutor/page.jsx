"use client";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
  DatePicker,
  DateField,
  Calendar,
  NumberField,
} from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";

const subjectOptions = [
  { value: "mathematics", label: "Mathematics" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "biology", label: "Biology" },
  { value: "english", label: "English" },
  { value: "bangla", label: "Bangla" },
  { value: "ict", label: "ICT" },
  { value: "higher-math", label: "Higher Math" },
];

const modeOptions = [
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
  { value: "both", label: "Both" },
];

const AddTutorPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [teachingMode, setTeachingMode] = useState([]);
  const { data: session } = authClient.useSession();
  const user = session?.user;


  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const tutor = Object.fromEntries(formData.entries());
    tutor.createdBy = user.id;
    tutor.subjects = subjects.map((s) => s.value);
    tutor.teachingMode = teachingMode.map((m) => m.value);
    tutor.hourlyFee = Number(tutor.hourlyFee);
    tutor.totalSlot = Number(tutor.totalSlot);
    tutor.sessionDate = new Date(tutor.sessionDate).toISOString();
    // console.log(tutor);

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(tutor),
    });
    const data = await res.json();

    toast.success("Tutor added successfully!");

    // console.log(data);
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="text-center w-xl mx-auto space-y-2">
        <h2 className="font-bold text-3xl">
          Add Your <span className="text-purple-700">Tutor Profile</span>
        </h2>
        <p className="text-gray-400 font-semibold">
          Share your expertise with students across the country. Fill in your
          details below to get listed and start receiving booking requests.
        </p>
      </div>
      <Card className="border border-gray-200 max-w-2xl mx-auto mt-10">
        <Form onSubmit={onSubmit} className="w-full max-w-2xl mx-auto">
          <Fieldset>
            <FieldGroup>
              <TextField
                isRequired
                name="tutorName"
                validate={(value) => {
                  if (value.length < 3) {
                    return "Name must be at least 3 characters";
                  }
                  return null;
                }}
              >
                <Label className="text-sm font-bold">Tutor Name</Label>
                <Input placeholder="John Doe" />
                <FieldError />
              </TextField>
              <TextField isRequired name="photoUrl" type="text">
                <Label className="text-sm font-bold">Photo URL</Label>
                <Input placeholder="Paste image link (e.g. ibb.co/xxxx)" />
                <FieldError />
              </TextField>
              <Label className="text-sm font-bold">Subject/Category</Label>
              <Select
                instanceId="subjects-select"
                isMulti
                options={subjectOptions}
                value={subjects}
                onChange={(selected) => setSubjects(selected || [])}
                placeholder="Select Subject"
              />

              <TextField isRequired name="availability" type="text">
                <Label className="text-sm font-bold">
                  Available Days and Time
                </Label>
                <Input placeholder="Sun - Thu, 5.00 PM - 8.00 PM" />
                <FieldError />
              </TextField>

              <NumberField
                className="w-full"
                isRequired
                minValue={0}
                name="hourlyFee"
                placeholder="e.g. 100"
              >
                <Label className="text-sm font-bold">Hourly Fee</Label>
                <NumberField.Group className="flex">
                  <NumberField.Input className="flex-1" />
                  <div className="flex h-full flex-col border-l border-field-placeholder/15">
                    <NumberField.IncrementButton className="flex h-1/2 w-6 items-center justify-center rounded-none border-0 pt-0.5 text-sm">
                      <svg
                        aria-hidden="true"
                        height="11"
                        viewBox="0 0 16 16"
                        width="11"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M13.03 10.53a.75.75 0 0 1-1.06 0L8 6.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06"
                          fill="currentColor"
                          fillRule="evenodd"
                        />
                      </svg>
                    </NumberField.IncrementButton>
                    <NumberField.DecrementButton className="flex h-1/2 w-6 items-center justify-center rounded-none border-0 pb-0.5 text-sm">
                      <svg
                        aria-hidden="true"
                        height="11"
                        viewBox="0 0 16 16"
                        width="11"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M2.97 5.47a.75.75 0 0 1 1.06 0L8 9.44l3.97-3.97a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 0-1.06"
                          fill="currentColor"
                          fillRule="evenodd"
                        />
                      </svg>
                    </NumberField.DecrementButton>
                  </div>
                </NumberField.Group>
              </NumberField>

              <NumberField
                className="w-full"
                isRequired
                minValue={0}
                name="totalSlot"
                placeholder="e.g. 10"
              >
                <Label className="text-sm font-bold">
                  Total Slots Available
                </Label>
                <NumberField.Group className="flex">
                  <NumberField.Input className="flex-1" />
                  <div className="flex h-full flex-col border-l border-field-placeholder/15">
                    <NumberField.IncrementButton className="flex h-1/2 w-6 items-center justify-center rounded-none border-0 pt-0.5 text-sm">
                      <svg
                        aria-hidden="true"
                        height="11"
                        viewBox="0 0 16 16"
                        width="11"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M13.03 10.53a.75.75 0 0 1-1.06 0L8 6.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06"
                          fill="currentColor"
                          fillRule="evenodd"
                        />
                      </svg>
                    </NumberField.IncrementButton>
                    <NumberField.DecrementButton className="flex h-1/2 w-6 items-center justify-center rounded-none border-0 pb-0.5 text-sm">
                      <svg
                        aria-hidden="true"
                        height="11"
                        viewBox="0 0 16 16"
                        width="11"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M2.97 5.47a.75.75 0 0 1 1.06 0L8 9.44l3.97-3.97a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 0-1.06"
                          fill="currentColor"
                          fillRule="evenodd"
                        />
                      </svg>
                    </NumberField.DecrementButton>
                  </div>
                </NumberField.Group>
              </NumberField>
              <DatePicker className="w-full" name="sessionDate" isRequired>
                <Label className="text-sm font-bold">Session Start Date</Label>
                <DateField.Group fullWidth>
                  <DateField.Input>
                    {(segment) => <DateField.Segment segment={segment} />}
                  </DateField.Input>
                  <DateField.Suffix>
                    <DatePicker.Trigger>
                      <DatePicker.TriggerIndicator />
                    </DatePicker.Trigger>
                  </DateField.Suffix>
                </DateField.Group>
                <DatePicker.Popover>
                  <Calendar aria-label="Event date">
                    <Calendar.Header>
                      <Calendar.YearPickerTrigger>
                        <Calendar.YearPickerTriggerHeading />
                        <Calendar.YearPickerTriggerIndicator />
                      </Calendar.YearPickerTrigger>
                      <Calendar.NavButton slot="previous" />
                      <Calendar.NavButton slot="next" />
                    </Calendar.Header>
                    <Calendar.Grid>
                      <Calendar.GridHeader>
                        {(day) => (
                          <Calendar.HeaderCell>{day}</Calendar.HeaderCell>
                        )}
                      </Calendar.GridHeader>
                      <Calendar.GridBody>
                        {(date) => <Calendar.Cell date={date} />}
                      </Calendar.GridBody>
                    </Calendar.Grid>
                    <Calendar.YearPickerGrid>
                      <Calendar.YearPickerGridBody>
                        {({ year }) => <Calendar.YearPickerCell year={year} />}
                      </Calendar.YearPickerGridBody>
                    </Calendar.YearPickerGrid>
                  </Calendar>
                </DatePicker.Popover>
              </DatePicker>
              <TextField isRequired name="institution" type="text">
                <Label className="text-sm font-bold">Institution</Label>
                <Input placeholder="Dhaka University" />
                <FieldError />
              </TextField>
              <TextField name="experience" type="text">
                <Label className="text-sm font-bold">Experience</Label>
                <Input placeholder="3 years" />
                <FieldError />
              </TextField>
              <TextField isRequired name="location" type="text">
                <Label className="text-sm font-bold">
                  Location (Area/City)
                </Label>
                <Input placeholder="Dhaka" />
                <FieldError />
              </TextField>
              <Label className="text-sm font-bold">Teaching Mode</Label>
              <Select
                instanceId="teaching-mode-select"
                isMulti
                options={modeOptions}
                value={teachingMode}
                onChange={(selected) => setTeachingMode(selected || [])}
                placeholder="Select Mode"
              />
            </FieldGroup>
            <Fieldset.Actions>
              <Button
                className="bg-purple-500 hover:bg-purple-600 w-full"
                type="submit"
              >
                Submit
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>
      </Card>
    </div>
  );
};

export default AddTutorPage;
