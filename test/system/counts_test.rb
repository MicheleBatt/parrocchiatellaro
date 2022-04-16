require "application_system_test_case"

class CountsTest < ApplicationSystemTestCase
  setup do
    @count = counts(:one)
  end

  test "visiting the index" do
    visit counts_url
    assert_selector "h1", text: "Counts"
  end

  test "should create count" do
    visit counts_url
    click_on "New count"

    fill_in "Description", with: @count.description
    fill_in "Initial amount", with: @count.initial_amount
    fill_in "Name", with: @count.name
    click_on "Create Count"

    assert_text "Count was successfully created"
    click_on "Back"
  end

  test "should update Count" do
    visit count_url(@count)
    click_on "Edit this count", match: :first

    fill_in "Description", with: @count.description
    fill_in "Initial amount", with: @count.initial_amount
    fill_in "Name", with: @count.name
    click_on "Update Count"

    assert_text "Count was successfully updated"
    click_on "Back"
  end

  test "should destroy Count" do
    visit count_url(@count)
    click_on "Destroy this count", match: :first

    assert_text "Count was successfully destroyed"
  end
end
