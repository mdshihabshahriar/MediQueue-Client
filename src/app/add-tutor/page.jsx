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

// Shared styling for react-select to match the rest of the form
const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "44px",
    borderRadius: "0.75rem",
    borderColor: state.isFocused ? "#7e22ce" : "#e5e7eb",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(126,34,206,0.15)" : "none",
    "&:hover": { borderColor: "#a855f7" },
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#f3e8ff",
    borderRadius: "0.5rem",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#6b21a8",
    fontWeight: 600,
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9ca3af",
  }),
};

const AddTutorPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [teachingMode, setTeachingMode] = useState([]);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const tutor = Object.fromEntries(formData.entries());
    tutor.createdBy = user?.id;
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 py-14 px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-10">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300 px-3 py-1 rounded-full">
            Tutor Onboarding
          </span>
          <h2 className="font-extrabold text-3xl md:text-4xl text-slate-800 dark:text-white leading-tight">
            Add Your <span className="text-purple-600">Tutor Profile</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-sm md:text-base">
            Share your expertise with students across the country. Fill in
            your details below to get listed and start receiving booking
            requests.
          </p>
        </div>

        <Card className="border border-gray-100 dark:border-slate-700 max-w-2xl mx-auto shadow-xl shadow-purple-100/50 dark:shadow-none rounded-3xl p-6 md:p-10 bg-white dark:bg-slate-900">
          <Form onSubmit={onSubmit} className="w-full max-w-2xl mx-auto">
            <Fieldset>
              <FieldGroup className="space-y-5">
                <TextField
                  isRequired
                  name="tutorName"
                  validate={(value) => {
                    if (value.length < 3) {
                      return "Name must be at least 3 characters";
                    }
                    return null;
                  }}
                  className="space-y-1.5"
                >
                  <Label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Tutor Name
                  </Label>
                  <Input
                    placeholder="John Doe"
                    className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 dark:bg-slate-800 dark:border-slate-700"
                  />
                  <FieldError className="text-xs text-red-500" />
                </TextField>

                <TextField
                  isRequired
                  name="photoUrl"
                  type="text"
                  className="space-y-1.5"
                >
                  <Label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Photo URL
                  </Label>
                  <Input
                    placeholder="Paste image link (e.g. ibb.co/xxxx)"
                    className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 dark:bg-slate-800 dark:border-slate-700"
                  />
                  <FieldError className="text-xs text-red-500" />
                </TextField>

                <div className="space-y-1.5">
                  <Label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Subject/Category
                  </Label>
                  <Select
                    instanceId="subjects-select"
                    isMulti
                    options={subjectOptions}
                    value={subjects}
                    onChange={(selected) => setSubjects(selected || [])}
                    placeholder="Select Subject"
                    styles={selectStyles}
                  />
                </div>

                <TextField
                  isRequired
                  name="availability"
                  type="text"
                  className="space-y-1.5"
                >
                  <Label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Available Days and Time
                  </Label>
                  <Input
                    placeholder="Sun - Thu, 5.00 PM - 8.00 PM"
                    className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 dark:bg-slate-800 dark:border-slate-700"
                  />
                  <FieldError className="text-xs text-red-500" />
                </TextField>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <NumberField
                    className="w-full space-y-1.5"
                    isRequired
                    minValue={0}
                    name="hourlyFee"
                    placeholder="e.g. 100"
                  >
                    <Label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      Hourly Fee
                    </Label>
                    <NumberField.Group className="flex rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20">
                      <NumberField.Input className="flex-1 border-0 dark:bg-slate-800" />
                      <div className="flex h-full flex-col border-l border-field-placeholder/15">
                        <NumberField.IncrementButton className="flex h-1/2 w-7 items-center justify-center rounded-none border-0 pt-0.5 text-sm hover:bg-purple-50 dark:hover:bg-slate-700">
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
                        <NumberField.DecrementButton className="flex h-1/2 w-7 items-center justify-center rounded-none border-0 pb-0.5 text-sm hover:bg-purple-50 dark:hover:bg-slate-700">
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
                    className="w-full space-y-1.5"
                    isRequired
                    minValue={0}
                    name="totalSlot"
                    placeholder="e.g. 10"
                  >
                    <Label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      Total Slots Available
                    </Label>
                    <NumberField.Group className="flex rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20">
                      <NumberField.Input className="flex-1 border-0 dark:bg-slate-800" />
                      <div className="flex h-full flex-col border-l border-field-placeholder/15">
                        <NumberField.IncrementButton className="flex h-1/2 w-7 items-center justify-center rounded-none border-0 pt-0.5 text-sm hover:bg-purple-50 dark:hover:bg-slate-700">
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
                        <NumberField.DecrementButton className="flex h-1/2 w-7 items-center justify-center rounded-none border-0 pb-0.5 text-sm hover:bg-purple-50 dark:hover:bg-slate-700">
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
                </div>

                <DatePicker className="w-full space-y-1.5" name="sessionDate" isRequired>
                  <Label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Session Start Date
                  </Label>
                  <DateField.Group
                    fullWidth
                    className="rounded-xl border border-gray-200 dark:border-slate-700 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20 dark:bg-slate-800"
                  >
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
                          {({ year }) => (
                            <Calendar.YearPickerCell year={year} />
                          )}
                        </Calendar.YearPickerGridBody>
                      </Calendar.YearPickerGrid>
                    </Calendar>
                  </DatePicker.Popover>
                </DatePicker>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <TextField
                    isRequired
                    name="institution"
                    type="text"
                    className="space-y-1.5"
                  >
                    <Label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      Institution
                    </Label>
                    <Input
                      placeholder="Dhaka University"
                      className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 dark:bg-slate-800 dark:border-slate-700"
                    />
                    <FieldError className="text-xs text-red-500" />
                  </TextField>

                  <TextField name="experience" type="text" className="space-y-1.5">
                    <Label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      Experience
                    </Label>
                    <Input
                      placeholder="3 years"
                      className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 dark:bg-slate-800 dark:border-slate-700"
                    />
                    <FieldError className="text-xs text-red-500" />
                  </TextField>
                </div>

                <TextField
                  isRequired
                  name="location"
                  type="text"
                  className="space-y-1.5"
                >
                  <Label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Location (Area/City)
                  </Label>
                  <Input
                    placeholder="Dhaka"
                    className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 dark:bg-slate-800 dark:border-slate-700"
                  />
                  <FieldError className="text-xs text-red-500" />
                </TextField>

                <div className="space-y-1.5">
                  <Label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Teaching Mode
                  </Label>
                  <Select
                    instanceId="teaching-mode-select"
                    isMulti
                    options={modeOptions}
                    value={teachingMode}
                    onChange={(selected) => setTeachingMode(selected || [])}
                    placeholder="Select Mode"
                    styles={selectStyles}
                  />
                </div>
              </FieldGroup>

              <Fieldset.Actions className="mt-2">
                <Button
                  className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-bold w-full rounded-xl py-3 shadow-lg shadow-purple-300/40 transition-all"
                  type="submit"
                >
                  Submit Profile
                </Button>
              </Fieldset.Actions>
            </Fieldset>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AddTutorPage;