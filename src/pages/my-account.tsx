import { useEffect, useState } from 'react'
import {
  CardLayout,
  HeadingField,
  RichTextDisplayField,
  TextItem,
  TagField,
  StampField,
  TabsField,
} from '@pglevy/sailwind'
import {
  getPaymentInfo,
  getDrivers,
  getVehicles,
  type PaymentInfo,
  type Driver,
  type Vehicle,
} from '../db/account'

export default function MyAccount() {
  const [payment, setPayment] = useState<PaymentInfo | undefined>(undefined)
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  useEffect(() => {
    getPaymentInfo().then(setPayment)
    getDrivers().then(setDrivers)
    getVehicles().then(setVehicles)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Application Header: leave out for now; shoule horizontal site nav */}

      {/* Hero header */}
      <div className="bg-[#1155cc] px-8 pt-6 pb-8">
        <HeadingField
          text="My Account"
          size="LARGE_PLUS"
          fontWeight="BOLD"
          color="#ffffff"
          headingTag="H1"
          marginBelow="NONE"
        />
      </div>

      {/* Tabs + content */}
      <div className="mx-auto max-w-7xl px-0 pt-3 **:[[role='tabpanel']]:px-2">
        <TabsField
          tabs={[
            {
              value: 'overview',
              label: 'Overview',
              content: (
                <div className="flex flex-col gap-8 pt-4 lg:flex-row">
                  {/* Left column */}
                  <div className="shrink-0 space-y-8 lg:w-1/3">
                    {/* Payment section */}
                    <div>
                      <HeadingField
                        text="Payment"
                        size="MEDIUM_PLUS"
                        fontWeight="BOLD"
                        headingTag="H2"
                        marginBelow="STANDARD"
                      />
                      <CardLayout
                        padding="STANDARD"
                        showShadow={true}
                        showBorder={false}
                        style="NONE"
                        height="AUTO"
                      >
                        {/* Next Payment */}
                        <div className="mb-4 border-b border-gray-200 pb-4">
                          <HeadingField
                            text="Next Payment"
                            size="EXTRA_SMALL"
                            fontWeight="SEMI_BOLD"
                            headingTag="H3"
                            marginBelow="LESS"
                            color="SECONDARY"
                            className="tracking-wider uppercase"
                          />
                          <div className="flex items-center justify-between">
                            <RichTextDisplayField
                              labelPosition="COLLAPSED"
                              value={[
                                <TextItem
                                  key="amount"
                                  text={payment?.nextPaymentAmount ?? ''}
                                  size="MEDIUM"
                                  style="STRONG"
                                />,
                              ]}
                              marginBelow="NONE"
                            />
                            <RichTextDisplayField
                              labelPosition="COLLAPSED"
                              value={[
                                <TextItem
                                  key="due"
                                  text={payment?.nextPaymentDue ?? ''}
                                  size="STANDARD"
                                />,
                              ]}
                              marginBelow="NONE"
                              className="font-semibold"
                            />
                          </div>
                        </div>

                        {/* Payment Source */}
                        <div>
                          <HeadingField
                            text="Payment Source"
                            size="EXTRA_SMALL"
                            fontWeight="SEMI_BOLD"
                            headingTag="H3"
                            marginBelow="LESS"
                            color="SECONDARY"
                            className="tracking-wider uppercase"
                          />
                          <div className="mb-2 flex items-center justify-between">
                            <RichTextDisplayField
                              labelPosition="COLLAPSED"
                              value={[
                                <TextItem
                                  key="source"
                                  text={payment?.paymentSource ?? ''}
                                  size="STANDARD"
                                />,
                              ]}
                              marginBelow="NONE"
                              className="font-semibold"
                            />
                            <RichTextDisplayField
                              labelPosition="COLLAPSED"
                              value={[
                                <TextItem
                                  key="edit"
                                  text="Edit"
                                  size="STANDARD"
                                  color="ACCENT"
                                  link={() => {}}
                                  linkStyle="STANDALONE"
                                />,
                              ]}
                              marginBelow="NONE"
                            />
                          </div>
                          <div className="flex items-center gap-3">
                            <TagField
                              labelPosition="COLLAPSED"
                              size="SMALL"
                              tags={[
                                {
                                  text: 'AUTOPAY',
                                  backgroundColor: '#1155cc',
                                  textColor: '#ffffff',
                                },
                              ]}
                              marginBelow="NONE"
                            />
                            <RichTextDisplayField
                              labelPosition="COLLAPSED"
                              value={[
                                <TextItem
                                  key="desc"
                                  text={payment?.autopayDescription ?? ''}
                                  color="SECONDARY"
                                  size="SMALL"
                                />,
                              ]}
                              marginBelow="NONE"
                            />
                          </div>
                        </div>
                      </CardLayout>
                    </div>

                    {/* Insured Drivers section */}
                    <div>
                      <HeadingField
                        text="Insured Drivers"
                        size="MEDIUM_PLUS"
                        fontWeight="BOLD"
                        headingTag="H2"
                        marginBelow="STANDARD"
                      />
                      <CardLayout
                        padding="STANDARD"
                        showShadow={true}
                        showBorder={false}
                        style="NONE"
                        height="AUTO"
                      >
                        {drivers.map((driver, index) => (
                          <div
                            key={driver.id}
                            className={
                              index < drivers.length - 1 ? 'mb-4 border-b border-gray-200 pb-4' : ''
                            }
                          >
                            <HeadingField
                              text={driver.relationship}
                              size="EXTRA_SMALL"
                              fontWeight="SEMI_BOLD"
                              headingTag="H3"
                              marginBelow="LESS"
                              color="SECONDARY"
                              className="tracking-wider uppercase"
                            />
                            <div className="flex items-center gap-3">
                              <StampField
                                labelPosition="COLLAPSED"
                                text={driver.initial}
                                backgroundColor={driver.avatarColor}
                                contentColor="#ffffff"
                                size="MEDIUM"
                                marginBelow="NONE"
                              />
                              <div className="flex-1">
                                <RichTextDisplayField
                                  labelPosition="COLLAPSED"
                                  value={[
                                    <TextItem
                                      key="name"
                                      text={driver.name}
                                      size="MEDIUM"
                                      style="STRONG"
                                    />,
                                  ]}
                                  marginBelow="NONE"
                                  className="[&>div]:leading-3"
                                />
                                <RichTextDisplayField
                                  labelPosition="COLLAPSED"
                                  value={[
                                    <TextItem
                                      key="desc"
                                      text={driver.description}
                                      size="STANDARD"
                                      color="SECONDARY"
                                    />,
                                  ]}
                                  marginAbove="NONE"
                                  marginBelow="NONE"
                                  className="[&>div]:leading-1"
                                />
                              </div>
                              <RichTextDisplayField
                                labelPosition="COLLAPSED"
                                value={[
                                  <TextItem
                                    key="edit"
                                    text="Edit"
                                    size="STANDARD"
                                    color="ACCENT"
                                    link={() => {}}
                                    linkStyle="STANDALONE"
                                  />,
                                ]}
                                marginBelow="NONE"
                              />
                            </div>
                          </div>
                        ))}
                      </CardLayout>
                    </div>
                  </div>

                  {/* Right column — Vehicles & Coverage */}
                  <div className="flex-1">
                    <HeadingField
                      text="Vehicles & Coverage"
                      size="MEDIUM_PLUS"
                      fontWeight="BOLD"
                      headingTag="H2"
                      marginBelow="STANDARD"
                    />
                    <CardLayout
                      padding="STANDARD"
                      showShadow={true}
                      showBorder={false}
                      style="NONE"
                      height="AUTO"
                    >
                      {vehicles.map((vehicle, vIndex) => (
                        <div
                          key={vehicle.id}
                          className={
                            vIndex < vehicles.length - 1 ? 'mb-6 border-b border-gray-200 pb-6' : ''
                          }
                        >
                          <HeadingField
                            text={vehicle.label}
                            size="EXTRA_SMALL"
                            fontWeight="SEMI_BOLD"
                            headingTag="H3"
                            marginBelow="LESS"
                            color="SECONDARY"
                            className="tracking-wider uppercase"
                          />
                          <div className="flex gap-6">
                            {/* Vehicle name + edit */}
                            <div className="w-1/2 shrink-0">
                              <RichTextDisplayField
                                labelPosition="COLLAPSED"
                                value={[
                                  <TextItem
                                    key="name"
                                    text={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                                    size="MEDIUM"
                                    style="STRONG"
                                  />,
                                ]}
                                marginBelow="NONE"
                              />
                              <RichTextDisplayField
                                labelPosition="COLLAPSED"
                                value={[
                                  <TextItem
                                    key="edit"
                                    text="Edit"
                                    size="STANDARD"
                                    color="ACCENT"
                                    link={() => {}}
                                    linkStyle="STANDALONE"
                                  />,
                                ]}
                                marginBelow="NONE"
                              />
                            </div>

                            {/* Coverage details */}
                            <div className="flex-1 space-y-3">
                              {vehicle.coverages.map((coverage) => (
                                <div key={coverage.type}>
                                  <RichTextDisplayField
                                    labelPosition="COLLAPSED"
                                    marginBelow="NONE"
                                    value={[
                                      <TextItem
                                        key="type"
                                        text={coverage.type}
                                        size="STANDARD"
                                        style="STRONG"
                                      />,
                                    ]}
                                    className="[&>div]:leading-tight"
                                  />
                                  {coverage.details.map((detail, i) => (
                                    <RichTextDisplayField
                                      key={i}
                                      labelPosition="COLLAPSED"
                                      marginBelow="NONE"
                                      value={[
                                        <TextItem key="detail" text={detail} size="STANDARD" />,
                                      ]}
                                    />
                                  ))}
                                </div>
                              ))}
                              <RichTextDisplayField
                                labelPosition="COLLAPSED"
                                value={[
                                  <TextItem
                                    key="more"
                                    text="Show More"
                                    size="STANDARD"
                                    color="ACCENT"
                                    link={() => {}}
                                    linkStyle="STANDALONE"
                                  />,
                                ]}
                                marginBelow="NONE"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardLayout>
                  </div>
                </div>
              ),
            },
            {
              value: 'claims',
              label: 'Claims',
              content: <div className="py-8 text-gray-500">Claims content coming soon.</div>,
            },
            {
              value: 'preferences',
              label: 'Preferences',
              content: <div className="py-8 text-gray-500">Preferences content coming soon.</div>,
            },
          ]}
          defaultValue="overview"
          variant="UNDERLINE"
          className="[&_button]:bg-transparent"
        />
      </div>
    </div>
  )
}
