import { useState, useEffect } from 'react'
import {
  CardLayout,
  HeadingField,
  RichTextDisplayField,
  TextItem,
  ImageField,
  ButtonArrayLayout,
  TabsField,
} from '@pglevy/sailwind'
import { GraduationCap, MapPin, CircleCheck, Circle, Info } from 'lucide-react'
import {
  getSchedule,
  getQuickAccessLinks,
  getSupportTeam,
  getGraduationRequirements,
  type DaySchedule,
  type QuickAccessLink,
  type SupportTeamMember,
  type GraduationRequirement,
} from '../db/university'

// Custom brand colors for this page (not available as SAIL palette tokens)
const PAGE_BACKGROUND = '#f3f0f6'
const HIGHLIGHT_CARD_BACKGROUND = '#f1e8f4'

export default function UniversityDashboard() {
  const [schedule, setSchedule] = useState<DaySchedule[]>([])
  const [quickAccessLinks, setQuickAccessLinks] = useState<QuickAccessLink[]>([])
  const [supportTeam, setSupportTeam] = useState<SupportTeamMember[]>([])
  const [graduationRequirements, setGraduationRequirements] = useState<GraduationRequirement[]>([])

  useEffect(() => {
    getSchedule().then(setSchedule)
    getQuickAccessLinks().then(setQuickAccessLinks)
    getSupportTeam().then(setSupportTeam)
    getGraduationRequirements().then(setGraduationRequirements)
  }, [])

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: PAGE_BACKGROUND }}>
      {/* Left Sidebar */}
      <div className="w-72 shrink-0 bg-white shadow-md">
        <CardLayout padding="LESS" showShadow={false} showBorder={false} style="NONE">
          {/* Profile Section */}
          <div className="border-b border-gray-200 px-3 py-3">
            <div className="flex items-center gap-3">
              <ImageField
                labelPosition="COLLAPSED"
                images={[{ document: '/images/avatar-karen.jpg', altText: 'Karen Anderson' }]}
                size="TINY"
                style="AVATAR"
              />
              <div>
                <RichTextDisplayField
                  labelPosition="COLLAPSED"
                  value={[
                    <TextItem key="name" text="Karen Anderson" size="MEDIUM" style="STRONG" />,
                  ]}
                  marginBelow="NONE"
                />
                <RichTextDisplayField
                  labelPosition="COLLAPSED"
                  value={[<TextItem key="ssn" text="***-**-1234" size="STANDARD" />]}
                />
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="mt-4">
            <TabsField
              tabs={[
                { label: 'Home', value: 'home', content: <></> },
                { label: 'Classes', value: 'classes', content: <></> },
                { label: 'Health & Safety', value: 'health', content: <></> },
                { label: 'Housing & Residence Life', value: 'housing', content: <></> },
                { label: 'Tuition & Financial Aid', value: 'tuition', content: <></> },
                { label: 'Career Services', value: 'career', content: <></> },
              ]}
              value="home"
              orientation="VERTICAL"
              variant="UNDERLINE"
              color="PURPLE_800"
              className="[&_button]:justify-start **:[[role=tablist]]:w-full"
              marginBelow="NONE"
            />
          </div>

          {/* Quick Access */}
          <div className="mt-4 border-t border-gray-200 px-3 pt-4 pb-3">
            <RichTextDisplayField
              labelPosition="COLLAPSED"
              value={[<TextItem key="qa" text="QUICK ACCESS" color="SECONDARY" size="SMALL" />]}
              marginBelow="LESS"
            />
            {quickAccessLinks.map((link) => (
              <RichTextDisplayField
                key={link.id}
                labelPosition="COLLAPSED"
                value={[
                  <TextItem
                    key={link.id}
                    text={link.label}
                    color="PURPLE_800"
                    size="STANDARD"
                    link={() => {}}
                    linkStyle="STANDALONE"
                  />,
                ]}
                marginBelow="EVEN_LESS"
              />
            ))}
          </div>
        </CardLayout>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <CardLayout padding="MORE" showBorder={false} style={PAGE_BACKGROUND}>
          <div className="flex gap-6">
            {/* Class Schedule Column */}
            <div className="flex-1">
              <HeadingField
                text="My Class Schedule"
                size="LARGE"
                fontWeight="BOLD"
                headingTag="H2"
                marginBelow="STANDARD"
              />

              {schedule.map((day) => (
                <CardLayout
                  key={day.id}
                  padding="STANDARD"
                  showShadow={true}
                  showBorder={false}
                  style="NONE"
                  shape="SQUARED"
                  marginBelow="STANDARD"
                  decorativeBarPosition={day.day === 'Tuesday' ? 'START' : 'NONE'}
                  decorativeBarColor="PURPLE_800"
                >
                  <RichTextDisplayField
                    labelPosition="COLLAPSED"
                    value={[
                      <TextItem
                        key="day"
                        text={day.day}
                        size="MEDIUM"
                        style={day.day === 'Tuesday' ? 'STRONG' : 'PLAIN'}
                      />,
                    ]}
                    marginBelow="LESS"
                  />

                  {day.classes.length === 0 ? (
                    <div className="border-t border-gray-200 pt-3">
                      <RichTextDisplayField
                        labelPosition="COLLAPSED"
                        value={[
                          <TextItem key="none" text="No classes scheduled" color="SECONDARY" />,
                        ]}
                        align="CENTER"
                      />
                    </div>
                  ) : (
                    day.classes.map((cls) => (
                      <div key={cls.id} className="border-t border-gray-200 py-2">
                        <div className="flex items-start gap-2">
                          <div className="w-[22%]">
                            <RichTextDisplayField
                              labelPosition="COLLAPSED"
                              value={[<TextItem key="time" text={cls.time} style="STRONG" />]}
                              marginBelow="NONE"
                            />
                          </div>
                          <div className="w-[56%]">
                            <RichTextDisplayField
                              labelPosition="COLLAPSED"
                              value={[<TextItem key="course" text={cls.course} />]}
                              marginBelow="NONE"
                            />
                          </div>
                          <div className="flex w-[22%] items-center gap-1">
                            <MapPin size={14} className="shrink-0 text-gray-600" />
                            <span className="text-sm text-gray-700">{cls.location}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </CardLayout>
              ))}
            </div>

            {/* Right Column */}
            <div className="w-[45%]">
              {/* Path to Graduation */}
              <HeadingField
                text="My Path to Graduation"
                size="LARGE"
                fontWeight="BOLD"
                headingTag="H2"
                marginBelow="STANDARD"
              />

              <CardLayout
                padding="STANDARD"
                showShadow={true}
                showBorder={false}
                style="NONE"
                marginBelow="STANDARD"
              >
                {/* Gauge + Degree Info */}
                <div className="mb-4 flex items-center gap-4">
                  {' '}
                  <div className="relative h-16 w-16 shrink-0">
                    <svg className="h-16 w-16 -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        className="stroke-gray-300"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        className="stroke-purple-800"
                        strokeWidth="3"
                        strokeDasharray="77, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <GraduationCap size={20} className="text-gray-700" />
                    </div>
                  </div>
                  <div>
                    <RichTextDisplayField
                      labelPosition="COLLAPSED"
                      value={[
                        <TextItem
                          key="degree"
                          text="Bachelor of Science (BS)"
                          size="MEDIUM_PLUS"
                        />,
                      ]}
                      marginBelow="NONE"
                    />
                    <RichTextDisplayField
                      labelPosition="COLLAPSED"
                      value={[<TextItem key="term" text="Spring 2022" size="STANDARD" />]}
                      marginBelow="NONE"
                    />
                  </div>
                </div>

                {/* Credits */}
                <div className="mb-4 grid grid-cols-3 divide-x divide-gray-200">
                  <div className="pr-3">
                    <RichTextDisplayField
                      labelPosition="COLLAPSED"
                      value={[
                        <TextItem
                          key="lbl"
                          text="REQUIRED CREDITS"
                          color="SECONDARY"
                          size="SMALL"
                        />,
                      ]}
                      marginBelow="NONE"
                    />
                    <RichTextDisplayField
                      labelPosition="COLLAPSED"
                      value={[<TextItem key="val" text="120" size="LARGE_PLUS" />]}
                      marginBelow="NONE"
                    />
                  </div>
                  <div className="px-3">
                    <RichTextDisplayField
                      labelPosition="COLLAPSED"
                      value={[
                        <TextItem
                          key="lbl"
                          text="COMPLETED CREDITS"
                          color="SECONDARY"
                          size="SMALL"
                        />,
                      ]}
                      marginBelow="NONE"
                    />
                    <RichTextDisplayField
                      labelPosition="COLLAPSED"
                      value={[<TextItem key="val" text="92" size="LARGE_PLUS" />]}
                      marginBelow="NONE"
                    />
                  </div>
                  <div className="pl-3">
                    <RichTextDisplayField
                      labelPosition="COLLAPSED"
                      value={[
                        <TextItem
                          key="lbl"
                          text="IN-PROGRESS CREDITS"
                          color="SECONDARY"
                          size="SMALL"
                        />,
                      ]}
                      marginBelow="NONE"
                    />
                    <RichTextDisplayField
                      labelPosition="COLLAPSED"
                      value={[<TextItem key="val" text="15" size="LARGE_PLUS" />]}
                      marginBelow="NONE"
                    />
                  </div>
                </div>

                {/* Requirements Checklist */}
                <div className="space-y-2 border-t border-gray-200 pt-3">
                  {graduationRequirements.map((req) => (
                    <div key={req.id} className="flex items-center gap-2">
                      {req.done ? (
                        <CircleCheck size={20} className="shrink-0 text-green-600" />
                      ) : (
                        <Circle size={20} className="shrink-0 text-gray-400" />
                      )}
                      <span className="flex-1 text-sm">{req.label}</span>
                      <Info size={14} className="shrink-0 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardLayout>

              {/* Registration Banner */}
              <CardLayout
                padding="LESS"
                showShadow={true}
                showBorder={false}
                style={HIGHLIGHT_CARD_BACKGROUND}
                marginBelow="MORE"
                decorativeBarPosition="TOP"
                decorativeBarColor="PURPLE_800"
              >
                <div className="flex items-center gap-6">
                  <div className="w-48 shrink-0">
                    <ImageField
                      labelPosition="COLLAPSED"
                      images={[
                        {
                          document: '/images/reading-side.svg',
                          altText: 'Student reading illustration',
                        },
                      ]}
                      size="FIT"
                      isThumbnail={false}
                    />
                  </div>
                  <div>
                    <RichTextDisplayField
                      labelPosition="COLLAPSED"
                      value={[
                        <TextItem
                          key="reg"
                          text="Spring Semester Class Registration is Now Open"
                          color="PURPLE_800"
                          size="MEDIUM"
                          style="STRONG"
                        />,
                      ]}
                      marginBelow="LESS"
                    />
                    <ButtonArrayLayout
                      buttons={[
                        {
                          label: 'Register Now',
                          icon: 'pen',
                          size: 'SMALL',
                          style: 'OUTLINE',
                          color: 'PURPLE_800',
                        },
                      ]}
                      align="START"
                    />
                  </div>
                </div>
              </CardLayout>

              {/* Support Team */}
              <HeadingField
                text="My Support Team"
                size="LARGE"
                fontWeight="BOLD"
                headingTag="H2"
                marginBelow="STANDARD"
              />

              <CardLayout padding="STANDARD" showShadow={true} showBorder={false} style="NONE">
                {supportTeam.map((member, i) => (
                  <div
                    key={member.id}
                    className={`flex items-center gap-3 py-3 ${i < supportTeam.length - 1 ? 'border-b border-gray-200' : ''}`}
                  >
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="h-16 w-16 shrink-0 rounded-full"
                    />
                    <div className="flex-1">
                      <RichTextDisplayField
                        labelPosition="COLLAPSED"
                        value={[
                          <TextItem key="name" text={member.name} size="MEDIUM" style="STRONG" />,
                        ]}
                        marginBelow="NONE"
                      />
                      <RichTextDisplayField
                        labelPosition="COLLAPSED"
                        value={[<TextItem key="role" text={member.role} />]}
                        marginBelow="NONE"
                      />
                    </div>
                    <ButtonArrayLayout
                      buttons={[
                        {
                          label: 'Schedule Meeting',
                          icon: 'calendar',
                          size: 'SMALL',
                          style: 'OUTLINE',
                          color: 'SECONDARY',
                        },
                      ]}
                      align="START"
                    />
                  </div>
                ))}
              </CardLayout>
            </div>
          </div>
        </CardLayout>
      </div>
    </div>
  )
}
